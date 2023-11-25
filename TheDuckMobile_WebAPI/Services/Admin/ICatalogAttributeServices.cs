using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICatalogAttributeServices
    {
        public Task<CatalogAttribute?> AddCatalogAttribute(CatalogAttributeRequest request);
        public Task<bool> AddSelectionValueToCatalogAttribute(int catalogAttributeId, AddSelectionValueToCatalogAttributeRequest request);
        public Task<ICollection<CatalogAttributeResponse>> GetCatalogAttributesByCatalogId(int catalogId);
        public Task<bool> EditCatalogAttribute(int catalogAttributeId, CatalogAttributeUpdateRequest request);
        public Task<bool> DeleteCatalogAttribute(int catalogAttributeId);
        public Task<bool> DeleteSelectionValueFromCatalogAttribute(int catalogAttributeId, int selectionValueId);
    }
}
