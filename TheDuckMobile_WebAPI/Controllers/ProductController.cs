using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Services;
using TheDuckMobile_WebAPI.Models.Response;

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
    }
}
