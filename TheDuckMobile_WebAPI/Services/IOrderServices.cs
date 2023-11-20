using TheDuckMobile_WebAPI.Models.Request;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IOrderServices
    {
        public Task<bool> CreateOrderLoggedIn(CreateOrderLoggedInRequest request, Guid userId);
        public Task<bool> CreateOrderNonLoggedIn(CreateOrderNonLoggedInRequest request);
    }
}
