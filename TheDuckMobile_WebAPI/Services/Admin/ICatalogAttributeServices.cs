using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICatalogAttributeServices
    {
        public Task<CatalogAttribute?> AddCatalogAttribute(CatalogAttributeRequest request);
    }
}
