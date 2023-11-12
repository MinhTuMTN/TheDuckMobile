using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class CatalogServicesImpl : ICatalogServices
    {
        private readonly DataContext _context;
        public CatalogServicesImpl(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<object?> GetAllCatalogs()
        {
            var catalogs = await _context.Catalogs
                .Select(c => new { c.CatalogId, c.CatalogName, c.CatalogURL })
                .ToListAsync();
            return catalogs;
        }

        public async Task<CatalogDetailUserResponse?> GetCatalogDetailByURL(string url)
        {
            var catalog = await _context.Catalogs
                .Include(c => c.Brands)
                .Include(c => c.SpecialFeatures)
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.CatalogURL == url);
            if (catalog == null)
                return null;

            return new CatalogDetailUserResponse(catalog);
        }
    }
}
