using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IProductServices
    {
        public Task<List<Product>> GetBestSellingProducts(int numberOfProducts);
        public Task<List<Product>> GetNewestProducts(int numberOfProducts);
        public Task<List<Product>> GetHighlyRatedProducts(int numberOfProducts);
    }
}
