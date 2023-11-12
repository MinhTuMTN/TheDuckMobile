using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface ICatalogServices
    {
        public Task<object?> GetAllCatalogs();
        public Task<CatalogDetailUserResponse?> GetCatalogDetailByURL(string url);
    }
}
