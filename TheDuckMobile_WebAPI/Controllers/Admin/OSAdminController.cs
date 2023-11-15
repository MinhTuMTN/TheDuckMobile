using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class OSAdminController : ControllerBase
    {
        private readonly IOSAdminServices _osAdminServices;
        public OSAdminController(IOSAdminServices osAdminServices)
        {
            _osAdminServices = osAdminServices;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllOSs()
        {
            var osList = await _osAdminServices.GetAllOSs();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = osList,
                Message = "Successfully retrieved all OSs"
            });
        }
    }
}
