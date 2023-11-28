using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
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
                .Include(s => s.Address)
                .ToListAsync();
            return stores.Select(s => new StoreListResponse(s)).ToList();
        }

        public async Task<StoreDetailsResponse> GetStoreById(string storeId)
        {
            Guid guid = Guid.Parse(storeId);
            var store = await _context
                .Stores
                .Include(s => s.Address!)
                    .ThenInclude(a => a.Ward!)
                        .ThenInclude(w => w.District!)
                            .ThenInclude(d => d.Provine)
                .Include(s => s.Staffs)
                .Include(s => s.Provines)
                .FirstOrDefaultAsync(s => s.StoreId == guid);

            if (store == null)
                throw new CustomNotFoundException("Can't found store");

            return new StoreDetailsResponse(store, store.Address!,
                store.Staffs is null ? null : store.Staffs,
                store.Provines == null ? null : store.Provines);
        }

        public async Task<bool> DeleteStore(string storeId)
        {
            Guid id = Guid.Parse(storeId);
            var store = await _context
                .Stores
                .Where(s => s.StoreId == id && !s.IsDeleted)
                .FirstOrDefaultAsync();

            if (store == null)
                throw new CustomNotFoundException("Can't found store");

            store.IsDeleted = true;
            store.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return store.IsDeleted;
        }

        public async Task<Entities.Store?> RestoreStore(string storeId)
        {
            Guid guid = Guid.Parse(storeId);
            var store = await _context
                .Stores
                .Where(s => s.StoreId == guid && s.IsDeleted)
                .FirstOrDefaultAsync();

            if (store == null)
                throw new CustomNotFoundException("Can't found store");

            store.IsDeleted = false;
            store.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return store;
        }

        public async Task<StoreListResponse> UpdateStore(Guid storeId, UpdateStoreRequest request)
        {
            var store = await _context
                .Stores
                .Include(s => s.Orders)
                .Include(s => s.Staffs)
                .Include(s => s.Address)
                .FirstOrDefaultAsync(s => s.StoreId == storeId && !s.IsDeleted);

            if (store == null)
                throw new CustomNotFoundException("Can't found store");

            var ward = await _context
                .Wards
                .FirstOrDefaultAsync(w => w.WardId == request.WardId && !w.IsDeleted);

            if (ward == null)
                throw new CustomNotFoundException("Can't found ward");

            store.StoreName = request.StoreName;
            store.LastModifiedAt = DateTime.Now;
            store.Address!.StreetName = request.StreetName;
            store.Address!.Ward = ward;

            await _context.SaveChangesAsync();

            return new StoreListResponse(store);
        }

        public async Task<List<StoreProvinceResponse>> GetAllProvinces(Guid storeId)
        {
            var storeProvinces = await _context
                .Provines
                .Where(p => p.IsDeleted == false && p.StoreId == storeId)
                .ToListAsync();

            return storeProvinces.Select(p => new StoreProvinceResponse(p)).ToList();
        }

        public async Task<List<StoreProvinceResponse>> AddProvince(Guid storeId, StoreProvinceRequest request)
        {
            var province = await _context
                .Provines
                .Where(p => p.IsDeleted == false && p.ProvinceId == request.ProvinceId)
                .FirstOrDefaultAsync();

            if (province == null)
            {
                throw new CustomNotFoundException("Can't found province");
            }

            var store = await _context
                .Stores
                .Where(s => s.StoreId == storeId && !s.IsDeleted)
                .FirstOrDefaultAsync();
            if (store == null)
            {
                throw new CustomNotFoundException("Can't found store");
            }

            province.Store = store;
            await _context.SaveChangesAsync();

            var result = await GetAllProvinces(storeId);

            return result;
        }

        public async Task<List<StoreListResponse>> CreateStore(UpdateStoreRequest request)
        {
            var store = new Entities.Store
            {
                StoreId = Guid.NewGuid(),
                StoreName = request.StoreName,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now,
                IsDeleted = false,
                Address = new Address
                {
                    AddressId = Guid.NewGuid(),
                    StreetName = request.StreetName,
                    WardId = request.WardId
                },
                StoreProducts = new List<StoreProduct>()
            };


            var productVersions = await _context.ProductVersions.ToListAsync();

            foreach (var productVersion in productVersions)
            {
                store.StoreProducts.Add(new StoreProduct
                {
                    CreatedAt = DateTime.Now,
                    IsDelete = productVersion.IsDeleted,
                    LastModifiedAt = DateTime.Now,
                    ProductVersionId = productVersion.ProductVersionId,
                    StoreId = store.StoreId,
                    IsSelling = !productVersion.IsDeleted,
                    ProductVersion = productVersion,
                    Quantity = 0,
                    Store = store,
                    StoreProductId = Guid.NewGuid()
                });
            }

            await _context.Stores.AddAsync(store);
            await _context.SaveChangesAsync();

            var result = await GetAllStores();
            return result;
        }
    }
}
