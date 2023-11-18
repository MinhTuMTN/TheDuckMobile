using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class ProductDetailResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public ICollection<Vote>? Votes { get; set; }
        public ICollection<ProductVersion>? ProductVersions { get; set; }
        public ICollection<CatalogAttribute>? CatalogAttributes { get; set; }

        public ProductDetailResponse(Product product,
            ICollection<CatalogAttribute> catalogAttributes
        )
        {
            ProductId = product.ProductId;
            ProductName = product.ProductName;
            ProductDescription = product.ProductDescription;
            Votes = product.Votes;
            ProductVersions = product.ProductVersions;
            CatalogAttributes = catalogAttributes;
        }
    }
}
