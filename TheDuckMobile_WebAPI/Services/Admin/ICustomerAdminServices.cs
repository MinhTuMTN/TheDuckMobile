using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICustomerAdminServices
    {
        public Task<List<CustomerListResponse>> GetAllCustomers();
        public Task<CustomerDetailResponse?> GetCustomerById(Guid customerId);
        public Task<bool> DeleteCustomer(string customerId);
        public Task<Customer?> RestoreCustomer(string customerId);
    }
}
