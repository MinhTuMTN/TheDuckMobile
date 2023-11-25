using System.Linq;
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

        public async Task<List<CatalogListResponse>> GetAllCatalogs(bool isDeletedFilter)
        {
            var catalogs = _context.Catalogs
                .Include(c => c.Products)
                .AsQueryable();

            if (isDeletedFilter)
                catalogs = catalogs.Where(c => c.IsDeleted == false);

            var results = await catalogs.ToListAsync();
            return results.Select(c => new CatalogListResponse(c)).ToList();
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

        public async Task<CatalogSpecialFeaturesResponse> GetCatalogSpecialFeatures(int catalogId)
        {
            // 1: Find Special Feature in Catalog and 2: Find Special Feature not in Catalog
            var catalog = await _context.Catalogs
                .Include(c => c.SpecialFeatures)
                .FirstOrDefaultAsync(c => c.CatalogId == catalogId && c.IsDeleted == false);

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            var specialFeatures = await _context.SpecialFeatures
                .Where(sf => sf.IsDeleted == false)
                .ToListAsync();

            var availableSpecialFeatures = catalog.SpecialFeatures!.Where(s => s.IsDeleted == false).ToList();
            var notAvailableSpecialFeatures = specialFeatures.Except(availableSpecialFeatures).ToList();

            return new CatalogSpecialFeaturesResponse
            {
                AvailableCatalogSpecialFeatures = availableSpecialFeatures.Select(a => new SpecialFeatureItem
                {
                    SpecialFeatureId = a.SpecialFeatureId,
                    SpecialFeatureName = a.SpecialFeatureName
                }).ToList(),
                NotAvailableSpecialFeatures = notAvailableSpecialFeatures.Select(n => new SpecialFeatureItem
                {
                    SpecialFeatureId = n.SpecialFeatureId,
                    SpecialFeatureName = n.SpecialFeatureName
                }).ToList()
            };
        }

        public async Task<bool> DeleteCatalogSpecialFeature(int catalogId, int specialFeatureId)
        {
            var catalog = await _context.Catalogs
                .Include(c => c.SpecialFeatures)
                .FirstOrDefaultAsync(c => c.CatalogId == catalogId && c.IsDeleted == false);

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            var specialFeature = await _context.SpecialFeatures
                .FirstOrDefaultAsync(sf => sf.SpecialFeatureId == specialFeatureId && sf.IsDeleted == false);

            if (specialFeature == null || !catalog.SpecialFeatures!.Contains(specialFeature))
                throw new CustomNotFoundException("Can't found special feature");

            catalog.SpecialFeatures?.Remove(specialFeature);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
