using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request;
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

        [HttpGet("provinces")]
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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddAddress([FromBody] UserAddAddressRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _addressServices.AddUserAddress(Guid.Parse(id!), request);
            if (result == null)
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Add address failed"
                });
            }
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserAddresses()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _addressServices.GetUserAddresses(Guid.Parse(id!));
            if (result == null)
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Get user addresses failed"
                });
            }
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteAddress([FromQuery] Guid addressId)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _addressServices.DeleteUserAddress(Guid.Parse(id!), addressId);
            if (result == null)
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Delete address failed"
                });
            }
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditAddress([FromQuery] Guid addressId, [FromBody] UserAddAddressRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _addressServices.EditUserAddress(Guid.Parse(id!), addressId, request);
            if (result == null)
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Edit address failed"
                });
            }
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }
    }
}
