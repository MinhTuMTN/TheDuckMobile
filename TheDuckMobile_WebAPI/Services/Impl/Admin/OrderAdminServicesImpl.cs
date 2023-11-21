using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class OrderAdminServicesImpl : IOrderAdminServices
    {
        private readonly DataContext _context;

        public OrderAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<OrderListResponse>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Staff)
                .Include(o => o.Coupon)
                .Include(o => o.Address)
                .ToListAsync();
            return orders.Select(o => new OrderListResponse(o)).ToList();
        }

        public async Task<OrderDetailResponse> GetOrderById(string orderId)
        {
            Guid guid = Guid.Parse(orderId);
            var order = await _context
                .Orders
                .Include(o => o.Customer)
                .Include(o => o.Staff)
                .Include(o => o.Coupon)
                .Include(o => o.Address)
                .FirstOrDefaultAsync(o => o.OrderId == guid);

            var orderItems = await _context.OrderItems
                .Include(oi => oi.StoreProduct)
                .Where(oi => oi.OrderId == guid)
                .ToListAsync();

            if (order == null)
                throw new CustomNotFoundException("Can't found order");

            if (orderItems != null)
            {
                foreach (var item in orderItems)
                {
                    var storeProduct = await _context.StoreProducts
                        .Include(sp => sp.ProductVersion)
                        .FirstOrDefaultAsync(sp => sp.StoreProductId == item.StoreProductId);
                    if (storeProduct != null)
                    {
                        item.StoreProduct = storeProduct;
                    }
                }
                order.OrderItems = orderItems;
            }
            return new OrderDetailResponse(order);
        }
    }
}
