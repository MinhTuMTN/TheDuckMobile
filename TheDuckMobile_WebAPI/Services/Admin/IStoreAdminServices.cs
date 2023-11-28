using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IStoreAdminServices
    {
        public Task<List<StoreListResponse>> GetAllStores();
        public Task<List<StoreListResponse>> CreateStore(UpdateStoreRequest request);
        public Task<bool> DeleteStore(string storeId);
        public Task<Entities.Store?> RestoreStore(string storeId);
        public Task<StoreDetailsResponse> GetStoreById(string storeId);
        public Task<StoreListResponse> UpdateStore(Guid storeId, UpdateStoreRequest request);
        public Task<List<StoreProvinceResponse>> GetAllProvinces(Guid storeId);
        public Task<List<StoreProvinceResponse>> AddProvince(Guid storeId, StoreProvinceRequest request);
    }
}
