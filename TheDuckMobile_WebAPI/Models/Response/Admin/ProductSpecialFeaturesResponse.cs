namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProductSpecialFeaturesResponse
    {
        public List<SpecialFeatureItem>? NotAvailableSpecialFeatures { get; set; }
        public List<SpecialFeatureItem>? AvailableSpecialFeatures { get; set; }
    }
}
