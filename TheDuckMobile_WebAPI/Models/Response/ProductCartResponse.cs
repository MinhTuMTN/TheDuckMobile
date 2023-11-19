namespace TheDuckMobile_WebAPI.Models.Response
{
    public class ProductCartResponse
    {
        public Guid ProductVersionId { get; set; }
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? VersionName { get; set; }
        public string? Thumbnail { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public int Quantity { get; set; }
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }
    }
}
