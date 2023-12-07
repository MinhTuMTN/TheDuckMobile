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
                .Where(c => c.IsDeleted == false)
                .Select(c => new { c.CatalogId, c.CatalogName, c.CatalogURL })
                .ToListAsync();
            return catalogs;
        }

        public async Task<CatalogDetailUserResponse?> GetCatalogDetailByURL(string url)
        {
            var catalog = await _context.Catalogs
                .Include(c => c.Brands)
                .Include(c => c.SpecialFeatures)
                .Include(c => c.Products!)
                .ThenInclude(p => p.Votes)
                .FirstOrDefaultAsync(c => c.CatalogURL == url);
            if (catalog == null)
                return null;

            return new CatalogDetailUserResponse(catalog);
        }

        public async Task<object?> GetProductsByCatalogURL(
            string url,
            long minPrice,
            long maxPrice,
            List<int>? brands,
            List<int>? specialFeatures,
            int page,
            int limit,
            string? orderBy
        )
        {
            var catalog = await _context.Catalogs
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.CatalogURL == url);

            if (catalog == null)
                return null;


            var products = catalog.Products!
                .Where(p => p.ProductPrice >= minPrice && p.ProductPrice <= maxPrice && p.IsDeleted == false);

            if (brands != null && brands.Count > 0)
                products = products.Where(p => brands.Contains(p.BrandId));

            if (specialFeatures != null && specialFeatures.Count > 0)
                products = products.Where(p => p.SpecialFeatures!.Any(sf => specialFeatures.Contains(sf.SpecialFeatureId)));

            switch (orderBy)
            {
                case "price_asc":
                    products = products.OrderBy(p => p.ProductPrice);
                    break;
                case "price_desc":
                    products = products.OrderByDescending(p => p.ProductPrice);
                    break;
                case "best_seller":
                    products = products.OrderByDescending(p => p.Sold);
                    break;
                default:
                    break;
            }
;
            var totalProduct = products.Count();
            var totalPages = (int)Math.Ceiling((double)totalProduct / limit);

            products = products.Skip(page * limit).Take(limit);

            var productsResponse = products.Select(p => new ProductHomeResponse(p)).ToList();
            return new PaginationResponse
            {
                Objects = productsResponse,
                TotalPages = totalPages,
                Limit = limit,
                Page = page,
                TotalObjects = totalProduct
            };
        }
    }
}
