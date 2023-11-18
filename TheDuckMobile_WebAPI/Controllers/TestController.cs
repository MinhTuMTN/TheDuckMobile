using System.Dynamic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITwilioServices _twilioServices;
        private readonly IJsonServices _jsonServices;

        public TestController(ITwilioServices twilioServices, IJsonServices jsonServices)
        {
            _twilioServices = twilioServices;
            _jsonServices = jsonServices;
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

        [HttpPost("json-test")]
        public IActionResult JsonTest([FromForm] string json)
        {
            IDictionary<string, object>? expando = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);

            if (expando is null)
                return BadRequest("Invalid JSON");

            string[] keys = { "age", "name", "salary" };

            // Read the JSON object and print in console
            foreach (string key in keys)
            {
                // Check if the key exists
                if (!expando.ContainsKey(key))
                    return BadRequest($"Invalid JSON. Missing key: {key}");
                Console.WriteLine($"{key}: {expando[key]}");
            }

            return Ok(expando);
        }

        [HttpGet("json-test")]
        public IActionResult JsonTest()
        {
            IDictionary<string, object> expando = new Dictionary<string, object>();

            string keyAge = "age";
            string keyName = "name";

            expando.Add(keyName, "John Doe");
            expando.Add(keyAge, 42);

            string json = JsonConvert.SerializeObject(expando);

            return Ok(json);
        }
    }
}
