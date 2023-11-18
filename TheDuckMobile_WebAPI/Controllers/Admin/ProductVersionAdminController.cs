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
    }
}
