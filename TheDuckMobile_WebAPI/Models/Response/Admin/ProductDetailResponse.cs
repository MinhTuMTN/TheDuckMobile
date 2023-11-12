using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProductDetailResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public double? ProductPrice { get; set; }
        public double? PromotionPrice { get; set; }
        public string? Thumbnail { get; set; }
        public int Quantity { get; set; }
        public int Sold { get; set; }
        public float Rate { get; set; }
        public int NumberOfVotes { get; set; }
        public string? BrandName { get; set; }
        public string? CatalogName { get; set; }
        public string? OSName { get; set; }
        public string SpecialFeatures { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public ProductDetailResponse(Product product)
        {
            ProductId = product.ProductId;
            ProductName = product.ProductName;
            ProductDescription = product.ProductDescription;
            ProductPrice = product.ProductPrice;
            PromotionPrice = product.PromotionPrice;
            Thumbnail = product.Thumbnail;
            Quantity = product.Quantity;
            Sold = product.Sold;
            Rate = product.Rate;
            BrandName = product.Brand?.BrandName;
            CatalogName = product.Catalog?.CatalogName;
            OSName = product.OS?.OSName;
            SpecialFeatures = product.SpecialFeatures == null ? "" : string.Join(", ", product.SpecialFeatures.Select(p => p.SpecialFeatureName).ToArray());
            CreatedAt = product.CreatedAt;
            LastModifiedAt = product.LastModifiedAt;
            NumberOfVotes = product.Votes == null ? 0 : product.Votes.Count;
        }
    }
}
