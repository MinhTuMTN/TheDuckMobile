using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressServices _addressServices;

        public AddressController(IAddressServices addressServices)
        {
            _addressServices = addressServices;
        }

        [HttpGet("provines")]
        public async Task<IActionResult> GetProvines()
        {
            var provines = await _addressServices.GetProvines();
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = provines
            });
        }

        [HttpGet("districts")]
        public async Task<IActionResult> GetDistricts([FromQuery] int provineId)
        {
            var districts = await _addressServices.GetDistricts(provineId);
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = districts
            });
        }

        [HttpGet("wards")]
        public async Task<IActionResult> GetWards([FromQuery] int districtId)
        {
            var wards = await _addressServices.GetWards(districtId);
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = wards
            });
        }
    }
}
