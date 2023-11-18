using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorAdminController : ControllerBase
    {
        private readonly IColorAdminServices _colorServices;

        public ColorAdminController(IColorAdminServices colorServices)
        {
            _colorServices = colorServices;
        }

        [HttpPost]
        public async Task<IActionResult> AddColor([FromBody] ColorRequest request)
        {
            var color = await _colorServices.AddColor(request);

            if (color == null)
                throw new Exception("Color could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Color added successfully.",
                Data = color
            });
        }

        [HttpDelete("{colorId}")]
        public async Task<IActionResult> DeleteColor([FromRoute] string colorId)
        {
            var success = await _colorServices.DeleteColor(colorId);

            if (!success)
                throw new BadHttpRequestException("Color could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Color deleted successfully.",
                Data = null
            });
        }

        [HttpPut("{colorId}")]
        public async Task<IActionResult> EditColor([FromRoute] string colorId, [FromBody] ColorRequest request)
        {
            var color = await _colorServices.EditColor(colorId, request);

            if (color == null)
                throw new BadHttpRequestException("Color could not be edited.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Color edited successfully.",
                Data = color
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllColors()
        {
            var colors = await _colorServices.GetAllColors();

            if (colors == null)
                throw new BadHttpRequestException("Colors could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Colors retrieved successfully.",
                Data = colors
            });
        }

        [HttpGet("{colorId}")]
        public async Task<IActionResult> GetColorById([FromRoute] string colorId)
        {
            var color = await _colorServices.GetColorById(colorId);

            if (color == null)
                throw new BadHttpRequestException("Color could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Color retrieved successfully.",
                Data = color
            });
        }

        [HttpGet("restore/{colorId}")]
        public async Task<IActionResult> RestoreColor([FromRoute] string colorId)
        {
            var color = await _colorServices.RestoreColor(colorId);

            if (color == null)
                throw new BadHttpRequestException("Color could not be restored.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Color restored successfully.",
                Data = color
            });
        }
    }
}
