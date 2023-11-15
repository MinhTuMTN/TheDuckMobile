using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ISpecialFeatureAdminServices
    {
        public Task<List<SpecialFeatureListResponse>> GetAllSpecialFeatures();
    }
}
