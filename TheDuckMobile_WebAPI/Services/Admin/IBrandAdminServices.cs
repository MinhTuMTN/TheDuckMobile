using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IBrandAdminServices
    {
        public Task<List<BrandListResponse>> GetAllBrands();
        public Task<BrandResponse> AddBrand(BrandRequest request);
        public Task<BrandResponse> EditBrand(int brandId, BrandRequest request);
        public Task<bool> DeleteBrand(int brandId);
    }
}
