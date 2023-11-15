using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class StoreAdminServicesImpl : IStoreAdminServices
    {
        private readonly DataContext _context;

        public StoreAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<StoreListResponse>> GetAllStores()
        {
            var stores = await _context.Stores
                .Include(s => s.Orders)
                .Include(s => s.Staffs)
                .ToListAsync();
            return stores.Select(s => new StoreListResponse(s)).ToList();
        }
    }
}
