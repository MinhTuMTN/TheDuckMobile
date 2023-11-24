using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IOrderServices
    {
        public Task<bool> CreateOrderLoggedIn(CreateOrderLoggedInRequest request, Guid userId);
        public Task<bool> CreateOrderNonLoggedIn(CreateOrderNonLoggedInRequest request);
        public Task<PaginationResponse> GetUserOrders(Guid userId, int page, int limit);
        public Task<OrderDetailsUserResponse> GetOrderDetails(Guid userId, Guid orderId);
    }
}
