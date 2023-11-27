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
        private readonly IFirebaseServices _firebaseServices;

        public TestController(IFirebaseServices firebaseServices)
        {
            _firebaseServices = firebaseServices;
        }

        [HttpGet]
        public async Task<IActionResult> Test()
        {
            var result = await _firebaseServices
                .SendNotification(
                    "Hello",
                    "Xin chào bạn",
                    "token test",
                    new Dictionary<string, string>
                    {
                        { "message", "Your OTP is 12389a0" },
                        { "phoneNumber", "+84372913432" },
                    }
                );

            return Ok(result);
        }
    }
}
