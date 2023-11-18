namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class ProductVersionRequest
    {
        public string? VersionName { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public string? ColorId { get; set; }
        public string? Specification { get; set; }
        public IFormFile[]? Images { get; set; }
        public DateTime ReleaseTime { get; set; }
        public int Quantity { get; set; }
        public Guid ProductId { get; set; }

        public ProductVersionRequest()
        {

        }
    }
}
