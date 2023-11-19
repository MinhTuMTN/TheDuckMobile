using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Services;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Request;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices _productServices;
        public ProductController(IProductServices productServices)
        {
            _productServices = productServices;
        }

        [HttpGet("best-selling")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBestSellingProducts([FromQuery] int numberOfProducts = 8)
        {
            var bestSellingProducts = await _productServices.GetBestSellingProducts(numberOfProducts);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = bestSellingProducts,
                Message = "Successfully retrieved best selling products"
            });
        }

        [HttpGet("newest")]
        [AllowAnonymous]
        public async Task<IActionResult> GetNewestProducts([FromQuery] int numberOfProducts = 8)
        {
            var newestProducts = await _productServices.GetNewestProducts(numberOfProducts);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = newestProducts,
                Message = "Successfully retrieved newest products"
            });
        }

        [HttpGet("highly-rated")]
        [AllowAnonymous]
        public async Task<IActionResult> GetHighlyRatedProducts([FromQuery] int numberOfProducts = 8)
        {
            var highlyRatedProducts = await _productServices.GetHighlyRatedProducts(numberOfProducts);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = highlyRatedProducts,
                Message = "Successfully retrieved highly rated products"
            });
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchProducts(
            [FromQuery] string q,
            [FromQuery] string? orderBy = null,
            [FromQuery] int page = 0,
            [FromQuery] int limit = 8)
        {
            var result = await _productServices.SearchProduct(q, orderBy, page, limit);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = result,
                Message = "Successfully retrieved products"
            });
        }

        [HttpGet("{productId}/versions")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllProductVersions([FromRoute] Guid productId)
        {
            var productVersions = await _productServices.GetProductVersionsByProductId(productId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = productVersions,
                Message = "Successfully retrieved product versions"
            });
        }

        [HttpGet("{productId}/relative")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductRelative([FromRoute] Guid productId)
        {
            var relativeProducts = await _productServices.GetProductRelative(productId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = relativeProducts,
                Message = "Successfully retrieved relative products"
            });
        }

        // Get List Product Version Details by Array of UserCartItem
        [HttpPost("cart-details")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductCartDetails([FromBody] List<UserCartItem> userCartItems)
        {
            var productCartDetails = await _productServices.GetProductCartDetails(userCartItems);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = productCartDetails,
                Message = "Successfully retrieved product cart details"
            });
        }
    }
}
