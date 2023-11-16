using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressAdminController : ControllerBase
    {
        private readonly IAddressAdminServices _addressServices;
        public AddressAdminController(IAddressAdminServices addressServices)
        {
            _addressServices = addressServices;
        }

        [HttpGet("province/list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllProvinces()
        {
            var provinces = await _addressServices.GetAllProvinces();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = provinces,
                Message = "Successfully retrieved all provinces"
            });
        }
    }
}
