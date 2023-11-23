using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Controllers.Store
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Staff")]
    public class StoreManagementController : ControllerBase
    {
        private readonly IStoreManagementServices _storeManagementServices;
        public StoreManagementController(IStoreManagementServices storeManagementServices)
        {
            _storeManagementServices = storeManagementServices;
        }

        [HttpGet("store-name")]
        public async Task<IActionResult> GetStoreName()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var staffId = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _storeManagementServices.GetStoreNameByStaffId(Guid.Parse(staffId!));
            if (result == null)
                return BadRequest("Failed to get store name");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Successfully retrieved store name",
                Data = result
            });
        }

    }
}
