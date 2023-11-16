using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IBrandAdminServices
    {
        public Task<List<BrandListResponse>> GetAllBrands();
    }
}
