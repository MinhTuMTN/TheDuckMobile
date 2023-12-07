using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class AddProductSpecialFeatureResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public ICollection<SpecialFeatureResponse>? SpecialFeatures { get; set; }

        public AddProductSpecialFeatureResponse(Product product)
        {
            ProductId = product.ProductId;
            ProductName = product.ProductName;
            SpecialFeatures = product.SpecialFeatures?.Select(sf => new SpecialFeatureResponse(sf)).ToList();
        }
    }
}
