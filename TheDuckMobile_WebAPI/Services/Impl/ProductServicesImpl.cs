using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class ProductServicesImpl : IProductServices
    {
        private readonly DataContext _context;

        public ProductServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ProductHomeResponse>> GetBestSellingProducts(int numberOfProducts)
        {
            var bestSellingProducts = await _context.Products
                .Include(p => p.Votes)
                .OrderByDescending(p => p.Votes!.Count)
                .Take(numberOfProducts)
                .ToListAsync();
            return bestSellingProducts.Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<List<ProductHomeResponse>> GetHighlyRatedProducts(int numberOfProducts)
        {
            var highlyRatedProducts = await _context.Products
                .Include(p => p.Votes)
                .OrderByDescending(p => p.Rate)
                .Take(numberOfProducts)
                .ToListAsync();
            return highlyRatedProducts.Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<List<ProductHomeResponse>> GetNewestProducts(int numberOfProducts)
        {
            var newestProducts = _context.Products
                .Include(p => p.Votes)
                .OrderByDescending(p => p.CreatedAt)
                .Take(numberOfProducts)
                .ToListAsync();

            return (await newestProducts).Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<PaginationResponse> SearchProduct(string query, string? orderBy, int page, int limit)
        {
            var products = _context.Products
                .Include(p => p.Votes)
                .Where(p => (p.ProductName!.Contains(query)
                || p.Brand!.BrandName!.Contains(query))
                && p.IsDeleted == false);

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
                    products = products.OrderByDescending(p => p.CreatedAt);
                    break;
            }

            var totalProduct = products.Count();
            var totalPages = (int)Math.Ceiling((double)totalProduct / limit);

            products = products.Skip(page * limit).Take(limit);
            var productsResponse = await products.Select(p => new ProductHomeResponse(p)).ToListAsync();

            return new PaginationResponse
            {
                TotalPages = totalPages,
                Limit = limit,
                Page = page,
                TotalObjects = totalProduct,
                Objects = productsResponse
            };
        }
    }
}
