using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorAdminController : ControllerBase
    {
        private readonly IColorAdminServices _colorAdminServices;
        public ColorAdminController(IColorAdminServices colorAdminServices)
        {
            _colorAdminServices = colorAdminServices;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllColors()
        {
            var colors = await _colorAdminServices.GetAllColors();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = colors,
                Message = "Successfully retrieved all colors"
            });
        }
    }
}
