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
    }
}
