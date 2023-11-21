using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class OSAdminController : ControllerBase
    {
        private readonly IOSAdminServices _osServices;

        public OSAdminController(IOSAdminServices osServices)
        {
            _osServices = osServices;
        }

        [HttpPost]
        public async Task<IActionResult> AddOS([FromBody] OSRequest request)
        {
            var os = await _osServices.AddOS(request);

            if (os == null)
                throw new Exception("OS could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "OS added successfully.",
                Data = os
            });
        }


        [HttpGet]
        public async Task<IActionResult> GetAllOSs()
        {
            var osList = await _osServices.GetAllOSs();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = osList,
                Message = "Successfully retrieved all OSs"
            });
        }

        // Get by id
        [HttpGet("{osId}")]
        public async Task<IActionResult> GetOSById([FromRoute] int osId)
        {
            var os = await _osServices.GetOSById(osId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = os,
                Message = "Successfully retrieved OS"
            });
        }


        // Update
        [HttpPut("{osId}")]
        public async Task<IActionResult> UpdateOS([FromRoute] int osId, [FromBody] OSRequest request)
        {
            var os = await _osServices.UpdateOS(osId, request);

            if (os == null)
                throw new Exception("OS could not be updated.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "OS updated successfully.",
                Data = os
            });
        }

        //Delete
        [HttpDelete("{osId}")]
        public async Task<IActionResult> DeleteOS([FromRoute] int osId)
        {
            var success = await _osServices.DeleteOS(osId);

            if (success == false)
                throw new Exception("OS could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "OS deleted successfully.",
                Data = null
            });
        }

        [HttpGet("restore/{osId}")]
        public async Task<IActionResult> RestoreOS([FromRoute] int osId)
        {
            var os = await _osServices.RestoreColor(osId);

            if (os == null)
                throw new BadHttpRequestException("OS could not be restored.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "OS restored successfully.",
                Data = os
            });
        }
    }
}
