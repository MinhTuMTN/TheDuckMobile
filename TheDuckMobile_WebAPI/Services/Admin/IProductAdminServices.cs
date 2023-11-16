using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IProductAdminServices
    {
        public Task<List<ProductListResponse>> GetAllProducts();
        public Task<ProductDetailResponse?> GetProductById(Guid productId);
        public Task<Product?> EditProduct(Guid productId, EditProductRequest request);
        public Task<Product?> DeleteProduct(Guid productId);
        public Task<Product?> RestoreProduct(Guid productId);
    }
}
