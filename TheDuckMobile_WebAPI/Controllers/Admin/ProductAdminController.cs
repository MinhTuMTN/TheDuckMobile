using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ProductAdminController : ControllerBase
    {
        private readonly IProductAdminServices _productServices;
        public ProductAdminController(IProductAdminServices productServices)
        {
            _productServices = productServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productServices.GetAllProducts();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = products,
                Message = "Successfully retrieved all products"
            });
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProductById([FromRoute] Guid productId)
        {
            var product = await _productServices.GetProductById(productId);
            if (product == null)
                return NotFound();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = product,
                Message = "Successfully retrieved product"
            });
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid productId)
        {
            var product = await _productServices.DeleteProduct(productId);
            if (product == null)
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Product not found",
                    Data = null
                });
            return Ok(new GenericResponse
            {
                Success = true,
                Data = product,
                Message = "Successfully delete product"
            });
        }

        [HttpGet("restore/{productId}")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> RestoreProduct([FromRoute] Guid productId)
        {
            var product = await _productServices.RestoreProduct(productId);
            if (product == null)
                return NotFound();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = product,
                Message = "Successfully restore product"
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] AddProductRequest request)
        {
            var product = await _productServices.AddProduct(request);

            if (product == null)
                throw new Exception("Product could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product added successfully.",
                Data = product
            });
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> EditProduct([FromRoute] Guid productId, [FromBody] EditProductRequest request)
        {
            var product = await _productServices.EditProduct(productId, request);

            if (product == null)
                throw new Exception("Product could not be edited.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product edited successfully.",
                Data = product
            });
        }

        [HttpGet("filtered")]
        /*[Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> GetFilteredProducts(
            [FromQuery] string? search = "",
            [FromQuery] int page = 0,
            [FromQuery] int limit = 1,
            [FromQuery] List<int>? catalogIds = null,
            [FromQuery] List<bool>? productStatus = null,
            [FromQuery] List<int>? productQuantity = null
        )
        {
            var result = await _productServices
                .GetFilteredProducts(
                    search,
                    page,
                    limit,
                    catalogIds,
                    productStatus,
                    productQuantity
                );

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPut("thumbnail/{productId}")]
        public async Task<IActionResult> EditProductThumbnail([FromRoute] Guid productId, [FromForm] ProductThumbnailRequest request)
        {
            var result = await _productServices.EditProductThumbnail(productId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = result,
                Message = "Successfully edited product thumbnail"
            });
        }

        [HttpPost("{productId}/special-features")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSpecialFeatureToProduct(
            [FromRoute] Guid productId,
            [FromBody] AddSpecialFeatureToProductRequest request
            )
        {
            var product = await _productServices.AddSpecialFeatureToProduct(productId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = product,
                Message = "Successfully added special feature to product"
            });
        }

        [HttpGet("{productId}/special-features")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCatalogSpecialFeatures([FromRoute] Guid productId)
        {
            var productSpecialFeatures = await _productServices.GetProductSpecialFeatures(productId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = productSpecialFeatures,
                Message = "Successfully retrieved product special features"
            });
        }

        [HttpDelete("{productId}/special-features/{specialFeatureId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProductSpecialFeature([FromRoute] Guid productId, [FromRoute] int specialFeatureId)
        {
            var success = await _productServices.DeleteProductSpecialFeature(productId, specialFeatureId);

            if (!success)
                throw new BadHttpRequestException("Product special feature could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Product special feature deleted successfully.",
                Data = null
            });
        }
    }
}
