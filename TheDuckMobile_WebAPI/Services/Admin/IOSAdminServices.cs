using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IOSAdminServices
    {
        public Task<List<OSListResponse>> GetAllOSs();
    }
}
