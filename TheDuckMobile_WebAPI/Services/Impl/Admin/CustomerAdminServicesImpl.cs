using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class CustomerAdminServicesImpl : ICustomerAdminServices
    {
        private readonly DataContext _context;

        public CustomerAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerListResponse>> GetAllCustomers()
        {
            var customers = await _context.Customers
                .Include(c => c.Votes)
                .Include(c => c.Orders)
                .ToListAsync();
            return customers.Select(c => new CustomerListResponse(c)).ToList();
        }
    }
}
