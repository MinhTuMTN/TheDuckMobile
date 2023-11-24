using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IDistrictAdminServices
    {
        // CRUD District
        public Task<District> CreateDistrict(int provinceId, string districtName);
        public Task<District> UpdateDistrict(int districtId, string districtName);
        public Task<District> DeleteDistrict(int districtId);
        public Task<List<District>> GetAllDistricts();
    }
}
