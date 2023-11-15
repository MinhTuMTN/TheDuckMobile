using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface ICatalogServices
    {
        public Task<object?> GetAllCatalogs();
        public Task<CatalogDetailUserResponse?> GetCatalogDetailByURL(string url);
        public Task<object?> GetProductsByCatalogURL(
            string url,
            long minPrice,
            long maxPrice,
            List<int>? brands, List<int>?
            specialFeatures,
            int page,
            int limit,
            string? orderBy
       );
    }
}
