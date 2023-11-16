using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class BrandListResponse
    {
        public int BrandId { get; set; }
        public string? BrandName { get; set; }
        public string? Image { get; set; }
        public int NumberOfProducts { get; set; }
        public bool IsDeleted { get; set; }

        public BrandListResponse(Brand brand)
        {
            BrandId = brand.BrandId;
            BrandName = brand.BrandName;
            Image = brand.Image;
            NumberOfProducts = brand.Products == null ? 0 : brand.Products.Count;
            IsDeleted = brand.IsDeleted;
        }
    }
}
