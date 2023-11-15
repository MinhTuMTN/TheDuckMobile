using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
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
                .Include(o => o.Coupon)
                .Include(o => o.Staff)
                .Include(o => o.Customer)
                .ToListAsync();
            return orders.Select(o => new OrderListResponse(o)).ToList();
        }
    }
}
