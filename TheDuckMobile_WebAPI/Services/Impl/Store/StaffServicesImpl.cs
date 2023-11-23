using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StaffServicesImpl : IStaffServices
    {
        private readonly DataContext _context;
        public StaffServicesImpl(DataContext context)
        {
            _context = context;
        }
        public async Task<Entities.Store> GetStoreByStaffId(Guid staffId)
        {
            var store = await _context.Staffs
                .Include(s => s.Store)
                .Where(s => s.UserId == staffId)
                .Select(s => s.Store)
                .FirstOrDefaultAsync();

            if (store == null)
                throw new UnauthorizedException("Only staff can access this resource");

            return store;
        }
    }
}
