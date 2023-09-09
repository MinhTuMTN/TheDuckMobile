using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Config;
using TheDuckMobile_WebAPI.Models;
using TheDuckMobile_WebAPI.Models.Request;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly CloudinaryProvider _cloudinary;

        public TestController(CloudinaryProvider cloudinary)
        {
            _cloudinary = cloudinary;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Hello World!"
            });
        }

        // API Upload Personal Information include name, age and avatar image
        [HttpPost]
        public IActionResult Post([FromForm] TestModel model)
        {

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Upload successfully",
                Data = _cloudinary.Upload(model.Avatar)
            });

        }
    }
}
