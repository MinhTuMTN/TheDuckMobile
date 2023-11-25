using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IOSAdminServices
    {
        public Task<List<OS>> GetAllOSs();
        public Task<OS> GetOSById(int id);
        public Task<OS> AddOS(OSRequest request);
        public Task<OS> UpdateOS(int id, OSRequest request);
        public Task<OS?> RestoreOS(int osId);
        public Task<bool> DeleteOS(int id);
        public Task<List<OS>> GetActiveOSs();
    }
}
