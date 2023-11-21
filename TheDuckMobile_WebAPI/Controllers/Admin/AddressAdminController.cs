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

        [HttpGet("province")]
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

        [HttpGet("district")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllDistricts([FromQuery] int provinceId)
        {
            var districts = await _addressServices.GetAllDistricts(provinceId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = districts,
                Message = "Successfully retrieved all districts"
            });
        }

        [HttpGet("ward")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllWards([FromQuery] int districtId)
        {
            var wards = await _addressServices.GetAllWards(districtId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = wards,
                Message = "Successfully retrieved all wards"
            });
        }
    }
}
