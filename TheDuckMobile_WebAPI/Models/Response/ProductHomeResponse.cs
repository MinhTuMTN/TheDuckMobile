using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class ProductHomeResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public double? ProductPrice { get; set; }
        public double? PromotionPrice { get; set; }
        public string? Thumbnail { get; set; }
        public float Rate { get; set; }
        public int NumberOfVotes { get; set; }

        public ProductHomeResponse(Product product)
        {
            ProductId = product.ProductId;
            ProductName = product.ProductName;
            ProductPrice = product.ProductPrice;
            PromotionPrice = product.PromotionPrice;
            Thumbnail = product.Thumbnail;
            Rate = product.Rate;
            NumberOfVotes = product.Votes == null ? 0 : product.Votes.Count;
        }
    }
}
