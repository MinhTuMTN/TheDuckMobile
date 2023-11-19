using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
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

        public async Task<Store> GetStoreById(string storeId)
        {
            Guid guid = Guid.Parse(storeId);
            var store = await _context
                .Stores
                .FirstOrDefaultAsync(s => s.StoreId == guid);

            if (store == null)
                throw new CustomNotFoundException("Can't found store");

            return store;
        }

        public async Task<bool> DeleteStore(string storeId)
        {
            var store = await GetStoreById(storeId);

            store.IsDeleted = true;
            store.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return store.IsDeleted;
        }

        public async Task<Store?> RestoreStore(string storeId)
        {
            Guid guid = Guid.Parse(storeId);
            var store = await GetStoreById(storeId);

            store.IsDeleted = false;
            store.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return store;
        }
    }
}
