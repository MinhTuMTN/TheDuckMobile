namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CatalogSpecialFeaturesResponse
    {
        public List<SpecialFeatureItem>? NotAvailableSpecialFeatures { get; set; }
        public List<SpecialFeatureItem>? AvailableCatalogSpecialFeatures { get; set; }
    }
}
