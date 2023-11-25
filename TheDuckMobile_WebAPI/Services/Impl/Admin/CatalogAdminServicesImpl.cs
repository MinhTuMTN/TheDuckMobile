using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
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

        public async Task<CatalogDetailUserResponse> AddBrandToCatalog(int catalogId, AddBrandToCatalogRequest request)
        {
            var catalog = await _context.Catalogs
                .Include(c => c.Brands)
                .FirstOrDefaultAsync(c => c.CatalogId == catalogId && c.IsDeleted == false);

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            var brand = await _context.Brands
                .FirstOrDefaultAsync(b => b.BrandId == request.BrandId && b.IsDeleted == false);

            if (brand == null)
                throw new CustomNotFoundException("Can't found brand");

            catalog.Brands?.Add(brand);
            await _context.SaveChangesAsync();

            return new CatalogDetailUserResponse(catalog);
        }

        public async Task<CatalogDetailUserResponse> AddCatalog(AddCatalogRequest request)
        {
            var catalog = new Catalog
            {
                CatalogName = request.CatalogName,
                CatalogURL = request.CatalogURL,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now
            };

            await _context.Catalogs.AddAsync(catalog);
            await _context.SaveChangesAsync();

            return new CatalogDetailUserResponse(catalog);
        }

        public async Task<CatalogDetailUserResponse> AddSpecialFeatureToCatalog(int catalogId, AddSpecialFeatureToCatalogRequest request)
        {
            var catalog = await _context.Catalogs
                .Include(c => c.Brands)
                .FirstOrDefaultAsync(c => c.CatalogId == catalogId && c.IsDeleted == false);

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            var specialFeature = await _context.SpecialFeatures
                .FirstOrDefaultAsync(sf => sf.SpecialFeatureId == request.SpecialFeatureId
                && sf.IsDeleted == false);

            if (specialFeature == null)
                throw new CustomNotFoundException("Can't found special feature");

            catalog.SpecialFeatures?.Add(specialFeature);
            await _context.SaveChangesAsync();

            return new CatalogDetailUserResponse(catalog);
        }

        public async Task<List<CatalogListResponse>> GetAllCatalogs()
        {
            var catalogs = await _context.Catalogs
                .Include(c => c.Products)
                .ToListAsync();
            return catalogs.Select(c => new CatalogListResponse(c)).ToList();
        }

        public async Task<List<CatalogListResponse>> GetActiveCatalogs()
        {
            var catalogs = await _context.Catalogs
                .Include(c => c.Products)
                .Where(c => c.IsDeleted == false)
                .ToListAsync();
            return catalogs.Select(c => new CatalogListResponse(c)).ToList();
        }

        public async Task<ICollection<CatalogAttribute>> GetCatalogAttributes(int catalogId)
        {
            var catalog = await GetCatalogById(catalogId);

            return catalog.CatalogAttributes!;
        }

        public async Task<Catalog> GetCatalogById(int catalogId)
        {
            var catalog = await _context
                .Catalogs
                .FirstOrDefaultAsync(c => c.CatalogId == catalogId);

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            return catalog;
        }

        public async Task<Catalog?> EditCatalog(int catalogId, AddCatalogRequest request)
        {
            var catalog = await GetCatalogById(catalogId);

            catalog.CatalogName = request.CatalogName;
            catalog.CatalogURL = request.CatalogURL;
            catalog.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return catalog;
        }

        public async Task<bool> DeleteCatalog(int catalogId)
        {
            var catalog = await GetCatalogById(catalogId);

            catalog.IsDeleted = true;
            catalog.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return catalog.IsDeleted;
        }

        public async Task<Catalog?> RestoreCatalog(int catalogId)
        {
            var catalog = await _context
                .Catalogs
                .FirstOrDefaultAsync(c => c.CatalogId == catalogId && c.IsDeleted == true);

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            catalog.IsDeleted = false;
            catalog.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return catalog;
        }
    }
}
