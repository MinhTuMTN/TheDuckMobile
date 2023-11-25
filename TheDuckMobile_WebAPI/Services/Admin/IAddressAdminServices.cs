using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IAddressAdminServices
    {
        public Task<List<ProvinceListResponse>> GetAllProvinces();
        public Task<List<District>> GetAllDistricts(int provinceId);
        public Task<List<Ward>> GetAllWards(int districtId);
        public Task<WardResponse> AddWard(AddWardRequest request);
        public Task<DistrictResponse> AddDistrict(AddDistrictRequest request);
        public Task<ProvinceResponse> AddProvince(AddProvinceRequest request);
        public Task<Provine> UpdateProvince(int provinceId, AddProvinceRequest request);
        public Task<District> UpdateDistrict(int districtId, AddDistrictRequest request);
        public Task<Ward> UpdateWard(int wardId, AddWardRequest request);
    }
}
