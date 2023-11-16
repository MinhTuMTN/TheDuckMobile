using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class StaffAdminServicesImpl : IStaffAdminServices
    {
        private readonly DataContext _context;

        public StaffAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<StaffListResponse>> GetAllStaffs()
        {
            var staffs = await _context.Staffs
                .Include(s => s.Orders)
                .Include(s => s.Store)
                .ToListAsync();
            return staffs.Select(s => new StaffListResponse(s)).ToList();
        }
    }
}
