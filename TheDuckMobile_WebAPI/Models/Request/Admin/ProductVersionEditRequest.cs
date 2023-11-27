namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class ProductVersionEditRequest
    {
        public string? VersionName { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public string? ColorId { get; set; }
        public string? Specification { get; set; }
        public List<string>? OldImagesUrl { get; set; }
        public IEnumerable<IFormFile>? NewImages { get; set; }
        public Guid ProductId { get; set; }

        public ProductVersionEditRequest()
        {
            NewImages = new List<IFormFile>();
            OldImagesUrl = new List<string>();
        }
    }
}
