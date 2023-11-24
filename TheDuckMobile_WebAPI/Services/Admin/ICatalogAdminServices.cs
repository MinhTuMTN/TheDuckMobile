using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICatalogAdminServices
    {
        public Task<List<CatalogListResponse>> GetAllCatalogs();
        public Task<CatalogDetailUserResponse> AddCatalog(AddCatalogRequest request);
        public Task<CatalogDetailUserResponse> AddBrandToCatalog(int catalogId, AddBrandToCatalogRequest request);
        public Task<CatalogDetailUserResponse> AddSpecialFeatureToCatalog(int catalogId, AddSpecialFeatureToCatalogRequest request);
        public Task<ICollection<CatalogAttribute>> GetCatalogAttributes(int catalogId);
        public Task<Catalog> GetCatalogById(int catalogId);
        public Task<Catalog?> EditCatalog(int catalogId, AddCatalogRequest request);
        public Task<bool> DeleteCatalog(int catalogId);
        public Task<Catalog?> RestoreCatalog(int catalogId);
    }
}
