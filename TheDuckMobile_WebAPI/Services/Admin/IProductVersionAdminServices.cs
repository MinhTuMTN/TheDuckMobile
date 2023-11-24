using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IProductVersionAdminServices
    {
        public Task<ProductVersion> CreateProductVersion(ProductVersionRequest request);
        public Task<bool> DeleteProductVersion(Guid productVersionId);
    }
}
