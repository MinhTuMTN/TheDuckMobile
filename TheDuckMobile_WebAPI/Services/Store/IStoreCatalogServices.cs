using TheDuckMobile_WebAPI.Models.Response.Store;

namespace TheDuckMobile_WebAPI.Services.Store
{
    public interface IStoreCatalogServices
    {
        public Task<List<CatalogFilterItemResponse>> GetCatalogFilterItems();
    }
}
