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
    [Authorize(Roles = "Admin")]
    public class ProvinceAdminController : ControllerBase
    {
        private readonly IProvinceAdminServices _provinceServices;

        public ProvinceAdminController(IProvinceAdminServices provinceServices)
        {
            _provinceServices = provinceServices;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProvince([FromBody] AddProvinceRequest request)
        {
            var province = await _provinceServices.CreateProvince(request.ProvinceName!);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = province,
                Message = "Successfully created province"
            });
        }
    }
}
