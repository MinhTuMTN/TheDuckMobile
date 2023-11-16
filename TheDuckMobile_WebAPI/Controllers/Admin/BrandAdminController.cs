using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandAdminController : ControllerBase
    {
        private readonly IBrandAdminServices _brandServices;
        public BrandAdminController(IBrandAdminServices brandServices)
        {
            _brandServices = brandServices;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = await _brandServices.GetAllBrands();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = brands,
                Message = "Successfully retrieved all brands"
            });
        }
    }
}
