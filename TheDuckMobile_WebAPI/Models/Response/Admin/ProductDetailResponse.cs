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
        public Brand? Brand { get; set; }
        public Catalog? Catalog { get; set; }
        public OS? OS { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public ICollection<ProductVersion>? ProductVersions { get; set; }
        public bool IsDeleted { get; set; }

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
            Brand = product.Brand;
            Catalog = product.Catalog;
            OS = product.OS;
            ProductVersions = product.ProductVersions;
            CreatedAt = product.CreatedAt;
            LastModifiedAt = product.LastModifiedAt;
            NumberOfVotes = product.Votes == null ? 0 : product.Votes.Count;
            IsDeleted = product.IsDeleted;
        }
    }
}
