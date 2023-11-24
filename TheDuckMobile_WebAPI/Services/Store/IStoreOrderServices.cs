using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Store;

namespace TheDuckMobile_WebAPI.Services.Store
{
    public interface IStoreOrderServices
    {
        public Task<PaginationResponse> GetStoreOrder(
            Guid staffId,
            int page,
            int limit,
            OrderState? orderState);

        public Task<StoreOrderDetailsResponse> GetStoreOrderDetails(Guid staffId, Guid orderId);
        public Task<bool> ConfirmStoreOrder(Guid staffId, Guid orderId);
        public Task<bool> CancelStoreOrder(Guid staffId, Guid orderId);
        public Task<bool> ConfirmDeliveryOrder(Guid staffId, Guid orderId);
        public Task<bool> ConfirmCompletedOrder(Guid staffId, Guid orderId);
    }
}
