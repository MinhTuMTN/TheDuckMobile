using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class BrandResponse
    {
        public int? BrandId { get; set; }
        public string? BrandName { get; set; }
        public string? BrandLogo { get; set; }

        public BrandResponse(Brand brand)
        {
            BrandId = brand.BrandId;
            BrandName = brand.BrandName;
            BrandLogo = brand.Image;
        }
    }
}
