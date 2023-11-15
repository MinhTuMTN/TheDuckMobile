using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICustomerAdminServices
    {
        public Task<List<CustomerListResponse>> GetAllCustomers();
    }
}
