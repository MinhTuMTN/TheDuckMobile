namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class ProductVersionRequest
    {
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public string? ColorId { get; set; }
        public string? Specification { get; set; }
        public string[] Images { get; set; }
        public DateTime ReleaseTime { get; set; }

        public ProductVersionRequest()
        {
            Images = new string[0];
        }
    }
}
