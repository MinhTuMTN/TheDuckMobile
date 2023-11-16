using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICatalogAdminServices
    {
        public Task<List<CatalogListResponse>> GetAllCatalogs();
    }
}
