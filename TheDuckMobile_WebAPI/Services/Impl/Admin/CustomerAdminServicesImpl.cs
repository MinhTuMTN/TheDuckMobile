using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
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

        public async Task<CustomerDetailResponse?> GetCustomerById(Guid customerId)
        {
            var customer = await _context.Customers
                .Include(c => c.Orders)
                .FirstOrDefaultAsync(c => c.UserId == customerId);

            if (customer == null)
                throw new CustomNotFoundException("Can't found customer");

            return new CustomerDetailResponse(customer);
        }

        public async Task<bool> DeleteCustomer(string customerId)
        {
            Guid guid = Guid.Parse(customerId);
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.UserId == guid);

            if (customer == null)
                throw new CustomNotFoundException("Can't found customer");

            customer.IsDeleted = true;
            customer.LastModifiredAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return customer.IsDeleted;
        }

        public async Task<Customer?> RestoreCustomer(string customerId)
        {
            Guid guid = Guid.Parse(customerId);
            var customer = await _context
                .Customers
                .FirstOrDefaultAsync(c => c.UserId == guid);

            if (customer == null)
                throw new CustomNotFoundException("Can't found customer");

            customer.IsDeleted = false;
            customer.LastModifiredAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return customer;
        }
    }
}
