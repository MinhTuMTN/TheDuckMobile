using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class OrderServicesImpl : IOrderServices
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public OrderServicesImpl(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }

        private async Task<bool> CreateOrder(CreateOrderLoggedInRequest request, Guid userId, TemporaryCustomerRequest? temporaryCustomer)
        {
            using (var transaction = _dataContext.Database.BeginTransaction())
            {
                var address = await _dataContext
                    .Addresss
                    .Where(a => a.AddressId == request.OrderAddress!.AddressId)
                    .FirstOrDefaultAsync();
                if (address == null)
                    throw new BadHttpRequestException("Address does not exist");

                // User
                // Check if Guid empty => Non Logged In
                User? user = null;
                if (userId != Guid.Empty)
                {
                    user = await _dataContext
                        .Users
                        .Where(u => u.UserId == userId
                            && u.IsDeleted == false
                        )
                        .FirstOrDefaultAsync();
                    if (user == null)
                        throw new BadHttpRequestException("User does not exist");
                }

                // Find Store Process
                var store = address.Ward!.District!.Provine!.Store;
                if (store == null)
                    throw new BadHttpRequestException("Store does not exist");

                // Create OrderItems and calculate total price
                var orderItems = new List<OrderItem>();
                double totalPrice = 0;
                foreach (var productVersionQuantity in request.ProductVersionQuantities!)
                {
                    var productVersion = await _dataContext
                        .ProductVersions
                        .Include(pv => pv.Product)
                        .FirstOrDefaultAsync(pv =>
                            pv.ProductVersionId == productVersionQuantity.ProductVersionId
                        );
                    if (productVersion == null)
                        throw new BadHttpRequestException("Some product version does not exist");

                    // Update quantity of product version and product
                    productVersion.Quantity -= productVersionQuantity.Quantity;
                    productVersion.Product!.Quantity -= productVersionQuantity.Quantity;
                    productVersion.Product!.Sold += productVersionQuantity.Quantity;
                    await _dataContext.SaveChangesAsync();

                    // Calculate total price with min(price, promotion price)
                    totalPrice += Math.Min(productVersion.Price, productVersion.PromotionPrice) * productVersionQuantity.Quantity;

                    // Search Store Product with Product Version and Store
                    var storeProduct = await _dataContext
                        .StoreProducts
                        .Where(sp => sp.ProductVersionId == productVersion.ProductVersionId
                            && sp.StoreId == store.StoreId
                        )
                        .FirstOrDefaultAsync();

                    // If Store Product does not exist, create new Store Product
                    // with quantity = (-1) * quantity
                    if (storeProduct == null)
                    {
                        storeProduct = new StoreProduct
                        {
                            StoreProductId = Guid.NewGuid(),
                            ProductVersion = productVersion,
                            Store = store,
                            Quantity = (-1) * productVersionQuantity.Quantity
                        };
                        await _dataContext.StoreProducts.AddAsync(storeProduct);
                    }
                    // If Store Product exist, update quantity
                    else
                    {
                        storeProduct.Quantity -= productVersionQuantity.Quantity;
                        await _dataContext.SaveChangesAsync();
                    }

                    // Create Order Item
                    var orderItem = new OrderItem
                    {
                        CreatedAt = DateTime.Now,
                        LastModifiredAt = DateTime.Now,
                        Price = productVersion.Price,
                        PromotionPrice = productVersion.PromotionPrice,
                        Quantity = productVersionQuantity.Quantity,
                        StoreProduct = storeProduct
                    };
                    orderItems.Add(orderItem);
                }

                // Update Point of Customer = 1% of total price
                Customer? customer = null;
                if (user != null)
                {
                    customer = (Customer)user;
                    customer.Point += (int)totalPrice / 100;
                    await _dataContext.SaveChangesAsync();
                }

                Coupon? coupon = null;
                double discount = 0;
                if (request.CouponCode != null && request.CouponCode != "")
                {
                    coupon = await _dataContext
                        .Coupons
                        .Where(c => c.CouponCode == request.CouponCode
                            && c.EndDate > DateTime.Now
                            && c.StartDate < DateTime.Now
                            && c.IsDeleted == false
                            && c.CurrentUse < c.MaxUse
                            && c.MinPrice <= totalPrice
                        )
                        .FirstOrDefaultAsync();

                    if (coupon != null)
                    {
                        coupon.CurrentUse++;
                        discount = Math.Min((double)coupon.Discount / 100 * totalPrice, coupon.MaxDiscount);
                        await _dataContext.SaveChangesAsync();
                    }
                }

                // Get Shipping Fee from AppSettings node in appsettings.json
                double shippingFee = _configuration.GetValue<double>("AppSettings:ShippingFee");

                TemporaryCustomer? temporaryCustomerEntity = null;
                if (userId == Guid.Empty)
                {
                    temporaryCustomerEntity = new TemporaryCustomer
                    {
                        TemporaryCustomerId = Guid.NewGuid(),
                        FullName = temporaryCustomer!.FullName,
                        Phone = temporaryCustomer.Phone,
                        Gender = temporaryCustomer.Gender,
                    };

                    await _dataContext.TemporaryCustomers.AddAsync(temporaryCustomerEntity);
                    await _dataContext.SaveChangesAsync();
                }
                try
                {
                    // Create Order
                    var order = new Order
                    {
                        OrderId = Guid.NewGuid(),
                        Address = address,
                        Coupon = coupon,
                        Customer = customer,
                        OrderState = OrderState.Pending,
                        CreatedAt = DateTime.Now,
                        LastModifiredAt = DateTime.Now,
                        OrderNote = request.OrderNote,
                        Staff = null,
                        Store = store,
                        Discount = discount,
                        Total = totalPrice + shippingFee - discount,
                        OrderItems = orderItems,
                        TemporaryCustomer = temporaryCustomerEntity
                    };

                    await _dataContext.Orders.AddAsync(order);

                    await _dataContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return true;
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return false;
                }
            }

        }

        public async Task<bool> CreateOrderLoggedIn(CreateOrderLoggedInRequest request, Guid userId)
        {
            return await CreateOrder(request, userId, null);
        }

        public async Task<bool> CreateOrderNonLoggedIn(CreateOrderNonLoggedInRequest request)
        {
            return await CreateOrder(new CreateOrderLoggedInRequest(request),
                Guid.Empty,
                request.TemporaryCustomer
            );
        }

        public async Task<PaginationResponse> GetUserOrders(Guid userId, int page, int limit)
        {
            // Include OrderItems, StoreProducts, ProductVersions, Products, ProductVersion.Color
            var orders = await _dataContext
                .Orders
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.StoreProduct!)
                    .ThenInclude(sp => sp.ProductVersion!)
                    .ThenInclude(pv => pv.Product)
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.StoreProduct!)
                    .ThenInclude(sp => sp.ProductVersion!)
                    .ThenInclude(pv => pv.Color)
                .Where(o => o.CustomerId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .Skip(page * limit)
                .Take(limit)
                .ToListAsync();

            // Return PaginationResponse
            var totalObjects = await _dataContext.Orders.Where(o => o.CustomerId == userId).CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalObjects / limit);
            return new PaginationResponse
            {
                TotalObjects = totalObjects,
                Page = page,
                Limit = limit,
                Objects = orders.Select(o => new OrderListUserResponse(o)).ToList(),
                TotalPages = totalPages
            };
        }

        public async Task<OrderDetailsUserResponse> GetOrderDetails(Guid userId, Guid orderId)
        {
            var order = await _dataContext
                .Orders
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.StoreProduct!)
                    .ThenInclude(sp => sp.ProductVersion!)
                    .ThenInclude(pv => pv.Product!)
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.StoreProduct!)
                    .ThenInclude(sp => sp.ProductVersion!)
                    .ThenInclude(pv => pv.Color)
                .Include(o => o.Address)
                .Include(o => o.Customer)
                .Where(o => o.OrderId == orderId && o.CustomerId == userId)
                .FirstOrDefaultAsync();

            if (order == null)
                throw new CustomNotFoundException("Order does not exist");

            return new OrderDetailsUserResponse(order);
        }
    }
}
