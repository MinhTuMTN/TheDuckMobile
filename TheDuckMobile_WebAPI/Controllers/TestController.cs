using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITwilioServices _twilioServices;

        public TestController(ITwilioServices twilioServices)
        {
            _twilioServices = twilioServices;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult Post([FromForm] string phone)
        {
            _twilioServices.SendSMSVerificationCode(phone);
            return Ok(phone);
        }

        [HttpPost("verify")]
        public IActionResult Verify([FromForm] string phone, [FromForm] string code)
        {
            return Ok(_twilioServices.VerifySMSVerificationCode(phone, code));
        }
    }
}
