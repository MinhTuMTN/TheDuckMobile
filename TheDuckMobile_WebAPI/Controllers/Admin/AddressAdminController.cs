using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
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

        [HttpPost("province")]
        public async Task<IActionResult> AddProvince([FromBody] AddProvinceRequest request)
        {
            var province = await _addressServices.AddProvince(request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = province,
                Message = "Successfully added province"
            });
        }

        [HttpPut("province/{provinceId}")]
        public async Task<IActionResult> UpdateProvince([FromRoute] int provinceId, [FromBody] AddProvinceRequest request)
        {
            var province = await _addressServices.UpdateProvince(provinceId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = province,
                Message = "Successfully update province"
            });
        }

        [HttpPost("district")]
        public async Task<IActionResult> AddDistrict([FromBody] AddDistrictRequest request)
        {
            var district = await _addressServices.AddDistrict(request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = district,
                Message = "Successfully added district"
            });
        }

        [HttpPut("district/{districtId}")]
        public async Task<IActionResult> UpdateProvince([FromRoute] int districtId, [FromBody] AddDistrictRequest request)
        {
            var district = await _addressServices.UpdateDistrict(districtId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = district,
                Message = "Successfully update district"
            });
        }

        [HttpPost("ward")]
        public async Task<IActionResult> AddWard([FromBody] AddWardRequest request)
        {
            var ward = await _addressServices.AddWard(request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = ward,
                Message = "Successfully added ward"
            });
        }

        [HttpPut("ward/{wardId}")]
        public async Task<IActionResult> UpdateWard([FromRoute] int wardId, [FromBody] AddWardRequest request)
        {
            var ward = await _addressServices.UpdateWard(wardId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = ward,
                Message = "Successfully update ward"
            });
        }
    }
}
