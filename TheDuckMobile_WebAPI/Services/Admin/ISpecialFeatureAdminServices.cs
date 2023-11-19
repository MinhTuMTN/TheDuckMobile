using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ISpecialFeatureAdminServices
    {
        public Task<ICollection<SpecialFeature>> GetAllSpecialFeatures();
        public Task<SpecialFeature> GetSpecialFeatureById(int id);
        public Task<SpecialFeature> AddSpecialFeature(SpecialFeatureRequest request);
        public Task<SpecialFeature> UpdateSpecialFeature(int id, SpecialFeatureRequest request);
        public Task<bool> DeleteSpecialFeature(int id);
        public Task<SpecialFeature?> RestoreSpecialFeature(int specialFeatureId);
    }
}
