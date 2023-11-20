namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class BrandRequest
    {
        public string? BrandName { get; set; }
        public IFormFile? Image { get; set; }
        public bool IsDeleted { get; set; }
    }
}
