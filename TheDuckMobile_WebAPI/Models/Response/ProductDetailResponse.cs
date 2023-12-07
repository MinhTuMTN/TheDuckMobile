using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class ProductDetailResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public float Rate { get; set; }
        public ICollection<Vote>? Votes { get; set; }
        public Dictionary<string, string>? CatalogAttributes { get; set; }
        public ICollection<ProductColorVersions>? ProductColorVersions { get; set; }
        public Catalog? Catalog { get; set; }
    }
}
