namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class ProductVersionRequest
    {
        public string? VersionName { get; set; }
        public double Price { get; set; }
        public string? ColorId { get; set; }
        public string? Specification { get; set; }
        public IEnumerable<IFormFile>? Images { get; set; }
        public Guid ProductId { get; set; }

        public ProductVersionRequest()
        {
            Images = new List<IFormFile>();
        }
    }
}
