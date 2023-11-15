using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductAdminController : ControllerBase
    {
        private readonly IProductAdminServices _productServices;
        public ProductAdminController(IProductAdminServices productServices)
        {
            _productServices = productServices;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
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

        [HttpGet("detail")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetProductById([FromQuery] Guid productId)
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

        [HttpGet("delete")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> DeleteProduct([FromQuery] Guid productId)
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

        [HttpGet("restore")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> RestoreProduct([FromQuery] Guid productId)
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
    }
}
