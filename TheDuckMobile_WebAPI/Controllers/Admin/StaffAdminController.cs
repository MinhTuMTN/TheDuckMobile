using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffAdminController : ControllerBase
    {
        private readonly IStaffAdminServices _staffServices;
        public StaffAdminController(IStaffAdminServices staffServices)
        {
            _staffServices = staffServices;
        }

        [HttpGet]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllStaffs()
        {
            var staffs = await _staffServices.GetAllStaffs();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = staffs,
                Message = "Successfully retrieved all staffs"
            });
        }
    }
}
