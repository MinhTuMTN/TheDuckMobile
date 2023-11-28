using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Store;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StoreOrderServicesImpl : IStoreOrderServices
    {
        private readonly DataContext _dataContext;
        private readonly IStaffServices _staffServices;

        public StoreOrderServicesImpl(DataContext dataContext, IStaffServices staffServices)
        {
            _dataContext = dataContext;
            _staffServices = staffServices;
        }

        public async Task<bool> CancelStoreOrder(Guid staffId, Guid orderId)
        {
            // Find Order with state != Completed and state!=canceled and StoreId = Staff's StoreId
            var staff = _dataContext.Staffs
                .Include(s => s.Store)
                .FirstOrDefault(s => s.UserId == staffId
                    && s.IsDeleted == false
                );

            if (staff == null)
                throw new UnauthorizedException("Can't access to this resources");

            var order = _dataContext.Orders
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.StoreProduct!)
                    .ThenInclude(sp => sp.ProductVersion!)
                    .ThenInclude(pv => pv.Product)
                .FirstOrDefault(o => o.OrderId == orderId
                    && o.OrderState != OrderState.Delivered
                    && o.OrderState != OrderState.Canceled
                    && o.StoreId == staff.StoreId
                );

            if (order == null)
                throw new CustomNotFoundException("Order not found");

            // Change Order State to Canceled
            order.OrderState = OrderState.Canceled;
            order.StaffId = staff.UserId;

            // Update Product Quantity, ProductVersion Quantity, StoreProduct Quantity, StoreProduct Sold Quantity
            foreach (var orderItem in order.OrderItems!)
            {
                var productVersion = orderItem.StoreProduct!.ProductVersion!;
                var product = productVersion.Product!;
                var storeProduct = orderItem.StoreProduct!;

                product.Quantity += orderItem.Quantity;
                product.Sold -= orderItem.Quantity;
                productVersion.Quantity += orderItem.Quantity;
                storeProduct.Quantity += orderItem.Quantity;
            }

            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ConfirmCompletedOrder(Guid staffId, Guid orderId)
        {
            // Find Order with state = Delivering and StoreId = Staff's StoreId
            var staff = await _dataContext.Staffs
                .Include(s => s.Store)
                .FirstOrDefaultAsync(s => s.UserId == staffId
                                   && s.IsDeleted == false);
            if (staff == null)
                throw new UnauthorizedException("Can't access to this resources");

            var order = await _dataContext.Orders
                .FirstOrDefaultAsync(o => o.OrderId == orderId
                                   && o.OrderState == OrderState.Delivering
                                                      && o.StoreId == staff.StoreId
                                                                     );
            if (order == null)
                throw new CustomNotFoundException("Order not found");

            // Change Order State to Delivered
            order.OrderState = OrderState.Delivered;
            order.StaffId = staff.UserId;

            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ConfirmDeliveryOrder(Guid staffId, Guid orderId)
        {
            // Find Order with state = Processing and StoreId = Staff's StoreId
            var staff = _dataContext.Staffs
                .Include(s => s.Store)
                .FirstOrDefault(s => s.UserId == staffId
                                   && s.IsDeleted == false
                                                  );
            if (staff == null)
                throw new UnauthorizedException("Can't access to this resources");

            var order = await _dataContext.Orders
                .FirstOrDefaultAsync(o => o.OrderId == orderId
                    && o.OrderState == OrderState.Processing
                    && o.StoreId == staff.StoreId
                );
            if (order == null)
                throw new CustomNotFoundException("Order not found");

            // Change Order State to Delivering
            order.OrderState = OrderState.Delivering;
            order.StaffId = staff.UserId;

            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ConfirmStoreOrder(Guid staffId, Guid orderId)
        {
            // Find Order with state = Pending and StoreId = Staff's StoreId
            var staff = await _dataContext.Staffs
                .Include(s => s.Store)
                .FirstOrDefaultAsync(s => s.UserId == staffId
                    && s.IsDeleted == false
                );
            if (staff == null)
                throw new UnauthorizedException("Can't access to this resources");

            var order = _dataContext.Orders
                .Include(o => o.Store)
                .Include(o => o.Customer)
                .Include(o => o.Address)
                .Include(o => o.Coupon)
                .Include(o => o.TemporaryCustomer)
                .FirstOrDefault(o => o.OrderId == orderId
                    && o.OrderState == OrderState.Pending
                    && o.StoreId == staff.StoreId
                );
            if (order == null)
                throw new CustomNotFoundException("Order not found");

            // Change Order State to Processing
            order.OrderState = OrderState.Processing;

            // Create Customer if not exist with TemporaryCustomer
            if (order.Customer == null)
            {
                var tempCustomer = order.TemporaryCustomer;
                if (tempCustomer == null)
                    throw new CustomNotFoundException("Customer not found");

                var customer = new Customer
                {
                    UserId = Guid.NewGuid(),
                    FullName = tempCustomer.FullName,
                    Phone = tempCustomer.Phone,
                    Addresses = new List<Address>(),
                    Gender = tempCustomer.Gender
                };
                customer.Addresses.Add(order.Address!);
                order.Customer = customer;
                order.StaffId = staff.UserId;

                // Remove TemporaryCustomer
                order.TemporaryCustomer = null;
            }

            await _dataContext.SaveChangesAsync();

            if (order.TemporaryCustomer != null)
                _dataContext.TemporaryCustomers.Remove(order.TemporaryCustomer);

            return true;
        }

        public async Task<PaginationResponse> GetStoreOrder(
            Guid staffId, int page, int limit, OrderState? orderState)
        {
            var store = await _staffServices.GetStoreByStaffId(staffId);

            if (store == null)
                throw new UnauthorizedException("Can't access to this resources");


            var orders = _dataContext.Orders
                .Where(o => o.StoreId == store.StoreId);

            if (orderState != null)
                orders = orders.Where(o => o.OrderState == orderState);

            var totalObjects = await orders.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalObjects / limit);

            var result = await orders
                .Skip(page * limit)
                .Take(limit)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new StoreOrderListResponse
                {
                    OrderId = o.OrderId,
                    OrderState = o.OrderState,
                    CreatedAt = o.CreatedAt,
                    Total = o.Total
                })
                .ToListAsync();

            return new PaginationResponse
            {
                Limit = limit,
                Page = page,
                TotalObjects = totalObjects,
                TotalPages = totalPages,
                Objects = result
            };
        }

        public async Task<StoreOrderDetailsResponse> GetStoreOrderDetails(Guid staffId, Guid orderId)
        {
            var staff = await _dataContext.Staffs
                .Include(s => s.Store)
                .FirstOrDefaultAsync(s => s.UserId == staffId
                    && s.IsDeleted == false
                );

            if (staff == null)
                throw new UnauthorizedException("Can't access to this resources");

            var order = await _dataContext.Orders
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.StoreProduct!)
                    .ThenInclude(sp => sp.ProductVersion!)
                    .ThenInclude(pv => pv.Product)
                .Include(o => o.Customer)
                .Include(o => o.Store)
                .Include(o => o.Address)
                .Include(o => o.Coupon)
                .Include(o => o.TemporaryCustomer)
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.StoreId == staff.StoreId);

            if (order == null)
                throw new UnauthorizedException("Can't access to this resources");

            return new StoreOrderDetailsResponse(order);
        }
    }
}
