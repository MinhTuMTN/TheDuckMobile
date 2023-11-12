using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IProductServices
    {
        public Task<List<ProductHomeResponse>> GetBestSellingProducts(int numberOfProducts);
        public Task<List<ProductHomeResponse>> GetNewestProducts(int numberOfProducts);
        public Task<List<ProductHomeResponse>> GetHighlyRatedProducts(int numberOfProducts);
    }
}
