using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class ProductColorVersions
    {
        public Guid ColorId { get; set; }
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }
        public ICollection<ProductVersion>? ProductVersions { get; set; }

        public ProductColorVersions(Color color, ICollection<ProductVersion> productVersions)
        {
            ColorId = color.ColorId;
            ColorName = color.ColorName;
            ColorCode = color.ColorCode;
            ProductVersions = productVersions;
        }
    }
}
