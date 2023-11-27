using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IStaffAdminServices
    {
        public Task<List<StaffListResponse>> GetAllStaffs();
        public Task<StaffListResponse> CreateStaff(Guid storeId, CreateStaffRequest request);
        public Task<string> ResetPassword(Guid storeId, Guid staffId);
    }
}
