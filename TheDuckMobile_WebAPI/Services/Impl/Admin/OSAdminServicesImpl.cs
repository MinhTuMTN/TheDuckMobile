using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class OSAdminServicesImpl : IOSAdminServices
    {
        private readonly DataContext _context;

        public OSAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<OSListResponse>> GetAllOSs()
        {
            var osList = await _context.OSs.ToListAsync();
            return osList.Select(o => new OSListResponse(o)).ToList();
        }
    }
}
