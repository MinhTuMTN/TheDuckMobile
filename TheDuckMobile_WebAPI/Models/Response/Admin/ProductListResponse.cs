using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProductListResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public double? ProductPrice { get; set; }
        public double? PromotionPrice { get; set; }
        public string? Thumbnail { get; set; }
        public int Quantity { get; set; }
        public int Sold { get; set; }
        public float Rate { get; set; }
        public int NumberOfVotes { get; set; }
        public bool IsDeleted { get; set; }

        public ProductListResponse(Product product)
        {
            ProductId = product.ProductId;
            ProductName = product.ProductName;
            ProductPrice = product.ProductPrice;
            PromotionPrice = product.PromotionPrice;
            Thumbnail = product.Thumbnail;
            Quantity = product.Quantity;
            Sold = product.Sold;
            Rate = product.Rate;
            NumberOfVotes = product.Votes == null ? 0 : product.Votes.Count;
            IsDeleted = product.IsDeleted;
        }
    }
}
