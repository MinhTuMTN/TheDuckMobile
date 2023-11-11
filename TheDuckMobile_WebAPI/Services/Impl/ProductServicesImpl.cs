using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class ProductServicesImpl : IProductServices
    {
        private readonly DataContext _context;

        public ProductServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetBestSellingProducts(int numberOfProducts)
        {
            var bestSellingProducts = await _context.Products
                .OrderByDescending(p => p.Sold)
                .Take(numberOfProducts)
                .ToListAsync();
            return bestSellingProducts;
        }

        public async Task<List<Product>> GetHighlyRatedProducts(int numberOfProducts)
        {
            var highlyRatedProducts = await _context.Products
                .OrderByDescending(p => p.Rate)
                .Take(numberOfProducts)
                .ToListAsync();
            return highlyRatedProducts;
        }

        public Task<List<Product>> GetNewestProducts(int numberOfProducts)
        {
            var newestProducts = _context.Products
                .OrderByDescending(p => p.CreatedAt)
                .Take(numberOfProducts)
                .ToListAsync();
            return newestProducts;
        }
    }
}
