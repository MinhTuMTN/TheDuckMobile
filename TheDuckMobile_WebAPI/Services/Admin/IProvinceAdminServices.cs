using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IProvinceAdminServices
    {
        // CRUD Province
        public Task<Provine> CreateProvince(string provinceName);
        public Task<Provine> UpdateProvince(int provinceId, string provinceName);
        public Task<Provine> DeleteProvince(int provinceId);
        public Task<List<Provine>> GetAllProvinces();
    }
}
