using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IAddressAdminServices
    {
        public Task<List<ProvinceListResponse>> GetAllProvinces();
        public Task<List<District>> GetAllDistricts(int provinceId);
        public Task<List<Ward>> GetAllWards(int districtId);
    }
}
