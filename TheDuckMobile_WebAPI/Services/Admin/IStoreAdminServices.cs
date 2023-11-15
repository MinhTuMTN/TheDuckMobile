using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IStoreAdminServices
    {
        public Task<List<StoreListResponse>> GetAllStores();
    }
}
