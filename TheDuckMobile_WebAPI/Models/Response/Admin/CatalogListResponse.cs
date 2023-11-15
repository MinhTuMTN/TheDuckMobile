using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CatalogListResponse
    {
        public int CatalogId { get; set; }
        public string? CatalogName { get; set; }
        public string? CatalogURL { get; set; }
        public int NumberOfProducts { get; set; }
        public bool IsDeleted { get; set; }

        public CatalogListResponse(Catalog catalog)
        {
            CatalogId = catalog.CatalogId;
            CatalogName = catalog.CatalogName;
            CatalogURL = catalog.CatalogURL;
            NumberOfProducts = catalog.Products == null ? 0 : catalog.Products.Count;
            IsDeleted = catalog.IsDeleted;
        }
    }
}
