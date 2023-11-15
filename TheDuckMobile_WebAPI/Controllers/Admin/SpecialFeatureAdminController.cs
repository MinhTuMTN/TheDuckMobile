using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialFeatureAdminController : ControllerBase
    {
        private readonly ISpecialFeatureAdminServices _specialFeatureAdminServices;
        public SpecialFeatureAdminController(ISpecialFeatureAdminServices specialFeatureAdminServices)
        {
            _specialFeatureAdminServices = specialFeatureAdminServices;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllSpecialFeatures()
        {
            var specialFeatures = await _specialFeatureAdminServices.GetAllSpecialFeatures();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = specialFeatures,
                Message = "Successfully retrieved all special features"
            });
        }
    }
}
