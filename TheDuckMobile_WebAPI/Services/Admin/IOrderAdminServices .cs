using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IOrderAdminServices
    {
        public Task<List<OrderListResponse>> GetAllOrders();
    }
}
