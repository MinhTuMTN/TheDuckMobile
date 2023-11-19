using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictAdminController : ControllerBase
    {
        private readonly IDistrictAdminServices _districtServices;

        public DistrictAdminController(IDistrictAdminServices districtServices)
        {
            _districtServices = districtServices;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDistrict([FromBody] AddDistrictRequest request)
        {
            var district = await _districtServices.CreateDistrict(request.ProvinceId, request.DistrictName!);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = district,
                Message = "Successfully created district"
            });
        }
    }
}
