using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialFeatureAdminController : ControllerBase
    {
        private readonly ISpecialFeatureServices _specialFeatureServices;

        public SpecialFeatureAdminController(ISpecialFeatureServices specialFeatureServices)
        {
            _specialFeatureServices = specialFeatureServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSpecialFeatures()
        {
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = await _specialFeatureServices.GetAllSpecialFeatures()
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialFeatureById([FromRoute] int id)
        {
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = await _specialFeatureServices.GetSpecialFeatureById(id)
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddSpecialFeature([FromBody] SpecialFeatureRequest request)
        {
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = await _specialFeatureServices.AddSpecialFeature(request)
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSpecialFeature([FromRoute] int id, [FromBody] SpecialFeatureRequest request)
        {
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = await _specialFeatureServices.UpdateSpecialFeature(id, request)
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialFeature([FromRoute] int id)
        {
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = await _specialFeatureServices.DeleteSpecialFeature(id)
            });
        }
    }
}
