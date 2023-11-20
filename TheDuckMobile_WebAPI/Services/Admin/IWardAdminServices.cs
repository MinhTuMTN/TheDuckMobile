using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IWardAdminServices
    {
        // CRUD Ward
        public Task<Ward> CreateWard(int districtId, string wardName);
        public Task<Ward> UpdateWard(int wardId, string wardName);
        public Task<Ward> DeleteWard(int wardId);
        public Task<List<Ward>> GetAllWards();
    }
}
