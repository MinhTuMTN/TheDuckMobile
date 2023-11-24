using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IStoreServices
    {
        public Task<List<StoreAddressResponse>> GetAllStoreAddresses();
    }
}
