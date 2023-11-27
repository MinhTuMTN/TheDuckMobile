using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProductThumbnailResponse
    {
        public string? Thumbnail { get; set; }

        public ProductThumbnailResponse(Product product)
        {
            Thumbnail = product.Thumbnail;
        }
    }
}
