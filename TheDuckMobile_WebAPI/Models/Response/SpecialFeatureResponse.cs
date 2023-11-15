using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class SpecialFeatureResponse
    {
        public int SpecialFeatureId { get; set; }
        public string? SpecialFeatureName { get; set; }

        public SpecialFeatureResponse(SpecialFeature specialFeature)
        {
            SpecialFeatureId = specialFeature.SpecialFeatureId;
            SpecialFeatureName = specialFeature.SpecialFeatureName;
        }
    }
}
