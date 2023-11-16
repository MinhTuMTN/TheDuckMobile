using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class CatalogDetailUserResponse
    {
        public int? CatalogId { get; set; }
        public string? CatalogName { get; set; }
        public ICollection<BrandResponse>? Brands { get; set; }
        public ICollection<SpecialFeatureResponse>? SpecialFeatures { get; set; }
        public ICollection<ProductHomeResponse>? Products { get; set; }

        public CatalogDetailUserResponse(Catalog catalog)
        {
            CatalogId = catalog.CatalogId;
            CatalogName = catalog.CatalogName;
            Brands = catalog.Brands?.Select(b => new BrandResponse(b)).ToList();
            SpecialFeatures = catalog.SpecialFeatures?.Select(sf => new SpecialFeatureResponse(sf)).ToList();
            Products = catalog.Products?.Select(p => new ProductHomeResponse(p)).Take(8).ToList();
        }
    }
}
