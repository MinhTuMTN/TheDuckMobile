using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVersionAdminController : ControllerBase
    {
        private readonly IProductVersionAdminServices _productVersionAdminServices;

        public ProductVersionAdminController(IProductVersionAdminServices productVersionAdminServices)
        {
            _productVersionAdminServices = productVersionAdminServices;
        }

        [HttpPost]
        public async Task<IActionResult> AddProductVerion([FromForm] ProductVersionRequest request)
        {
            var productVersion = await _productVersionAdminServices.CreateProductVersion(request);

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product version added successfully.",
                Data = productVersion
            });
        }

        [HttpDelete("{productVersionId}")]
        public async Task<IActionResult> DeleteProductVersion([FromRoute] Guid productVersionId)
        {
            var isDeleted = await _productVersionAdminServices.DeleteProductVersion(productVersionId);
            if (!isDeleted)
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Product version not found",
                    Data = null
                });
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product version deleted successfully",
                Data = isDeleted
            });
        }

        [HttpGet("attributes")]
        public async Task<IActionResult> GetProductVersionAttributes([FromQuery] Guid productId)
        {
            var productVersionAttributes = await _productVersionAdminServices.GetProductVersionAttributes(productId);
            if (productVersionAttributes == null)
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Product version not found",
                    Data = null
                });
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product version attributes retrieved successfully",
                Data = productVersionAttributes
            });
        }

        [HttpGet("{productVersionId}/restore")]
        public async Task<IActionResult> RestoreProductVersion([FromRoute] Guid productVersionId)
        {
           var result = await _productVersionAdminServices.RestoreProductVersion(productVersionId);
            if (!result)
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Product version not found",
                    Data = null
                });

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product version restored successfully",
                Data = result
            });
        }
    }
}
