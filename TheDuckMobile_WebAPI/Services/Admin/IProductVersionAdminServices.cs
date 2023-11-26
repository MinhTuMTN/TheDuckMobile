using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IProductVersionAdminServices
    {
        public Task<ProductVersion> CreateProductVersion(ProductVersionRequest request);
        public Task<bool> DeleteProductVersion(Guid productVersionId);
        public Task<ICollection<ProductVersionAttributesResponse>> GetProductVersionAttributes(Guid productId);
        public Task<bool> RestoreProductVersion(Guid productVersionId);
    }
}
