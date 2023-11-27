using System.Dynamic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IMSGraphAPIServices _mSGraphAPIServices;

        public TestController(IMSGraphAPIServices mSGraphAPIServices)
        {
            _mSGraphAPIServices = mSGraphAPIServices;
        }

        [HttpGet]
        public async Task<IActionResult> Test()
        {
            var user = await _mSGraphAPIServices.Test();

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Test",
                Data = user
            });
        }
    }
}
