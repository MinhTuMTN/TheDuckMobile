using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Store;

namespace TheDuckMobile_WebAPI.Services.Store
{
    public interface IStoreProductServices
    {
        public Task<PaginationResponse> GetStoreProducts(
            Guid staffId,
            string? search,
            int page, int limit,
            List<int>? categoryIds,
            List<bool>? storeProductStatus,
            List<int>? storeProductQuantity);

        public Task<bool> UpdateStoreProductQuantity(Guid staffId, Guid storeProductId, int quantity);
    }
}
