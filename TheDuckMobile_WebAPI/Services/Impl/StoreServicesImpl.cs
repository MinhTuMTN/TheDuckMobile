using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class StoreServicesImpl : IStoreServices
    {
        private readonly DataContext _context;

        public StoreServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<StoreAddressResponse>> GetAllStoreAddresses()
        {
            var stores = await _context
                .Stores
                .Include(s => s.Address)
                .Where(s => s.IsDeleted == false)
                .ToListAsync();

            return stores.Select(s => new StoreAddressResponse
            {
                StoreId = s.StoreId,
                Address = new UserAddressResponse(s.Address!)
            }).ToList();
        }
    }
}
