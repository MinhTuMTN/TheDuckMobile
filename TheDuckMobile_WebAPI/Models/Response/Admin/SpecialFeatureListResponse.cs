using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class SpecialFeatureListResponse
    {
        public int SpecialFeatureId { get; set; }
        public string? SpecialFeatureName { get; set; }
        public Boolean IsDeleted { get; set; }

        public SpecialFeatureListResponse(SpecialFeature specialFeature)
        {
            SpecialFeatureId = specialFeature.SpecialFeatureId;
            SpecialFeatureName = specialFeature.SpecialFeatureName;
            IsDeleted = specialFeature.IsDeleted;
        }
    }
}
