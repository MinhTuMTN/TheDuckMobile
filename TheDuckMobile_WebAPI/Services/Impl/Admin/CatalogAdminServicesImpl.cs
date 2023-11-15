using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class CatalogAdminServicesImpl : ICatalogAdminServices
    {
        private readonly DataContext _context;

        public CatalogAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<CatalogListResponse>> GetAllCatalogs()
        {
            var catalogs = await _context.Catalogs
                .Include(c => c.Products)
                .ToListAsync();
            return catalogs.Select(c => new CatalogListResponse(c)).ToList();
        }
    }
}
