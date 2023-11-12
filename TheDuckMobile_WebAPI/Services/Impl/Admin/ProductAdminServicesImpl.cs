using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class ProductAdminServicesImpl : IProductAdminServices
    {
        private readonly DataContext _context;

        public ProductAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ProductListResponse>> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Votes)
                .ToListAsync();
            return products.Select(p => new ProductListResponse(p)).ToList();
        }

        public async Task<ProductDetailResponse?> GetProductById(Guid productId)
        {
            var product = await _context.Products
                .Include(p => p.Votes)
                .Include(p => p.Catalog)
                .Include(p => p.Brand)
                .Include(p => p.OS)
                .Include(p => p.SpecialFeatures)
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null)
                return null;
            return new ProductDetailResponse(product);
        }

        public async Task<Product?> EditProduct(Guid productId, EditProductRequest request)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
                return null;

            product.ProductName = request.ProductName;
            product.ProductDescription = request.ProductDescription;
            product.Quantity = request.Quantity;
            product.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> DeleteProduct(Guid productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
                return null;

            product.IsDeleted = true;
            product.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> RestoreProduct(Guid productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
                return null;

            product.IsDeleted = false;
            product.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
