using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IStaffAdminServices
    {
        public Task<List<StaffListResponse>> GetAllStaffs();
    }
}
