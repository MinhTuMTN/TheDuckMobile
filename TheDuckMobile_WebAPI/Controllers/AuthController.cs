using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using TheDuckMobile_WebAPI.Config;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtProvider _jwtProvider;
        private readonly ITwilioServices _twilioServices;
        private readonly IUserServices _userServices;
        private readonly IConfiguration _configuration;

        public AuthController(
            JwtProvider jwtProvider,
            ITwilioServices twilioServices,
            IUserServices userServices,
            IConfiguration configuration)
        {
            _jwtProvider = jwtProvider;
            _twilioServices = twilioServices;
            _userServices = userServices;
            _configuration = configuration;
        }


        [HttpPost("check-phone-number")]
        public async Task<IActionResult> CheckPhoneNumber([FromBody] CheckPhoneNumberRequest request)
        {
            bool exist = await _userServices.CheckCustomerExists(request.Phone!);
            Regex regex = new Regex(@"^(\+84)\d{9,10}$");


            if (!regex.IsMatch(request.Phone!) || !request.Phone!.StartsWith("+84"))
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Phone Number",
                    Data = null
                });
            }

            List<string> phoneNotVerified = _configuration.GetSection("AppSettings:PhoneNotVerified").Get<List<string>>();

            if (phoneNotVerified != null && phoneNotVerified.Contains(request.Phone!))
            {
                return Ok(new GenericResponse
                {
                    Success = true,
                    Message = "Phone number is already in use",
                    Data = true
                });
            }

            if (!_twilioServices.SendSMSVerificationCode(request.Phone!))
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to send verification code",
                    Data = null
                });
            }

            if (!exist)
            {
                return Ok(new GenericResponse
                {
                    Success = true,
                    Message = "Phone number is not in use",
                    Data = false
                });
            }
            else
            {
                return Ok(new GenericResponse
                {
                    Success = true,
                    Message = "Phone number is already in use",
                    Data = true
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userServices.FindUserByPhone(request.Phone!);
            if (user == null)
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Phone Number",
                    Data = null
                });
            }

            List<string> phoneNotVerified = _configuration.GetSection("AppSettings:PhoneNotVerified").Get<List<string>>();

            if (phoneNotVerified.Contains(request.Phone!))
            {
                if (request.OTP == "777777")
                {
                    return Ok(new GenericResponse
                    {
                        Success = true,
                        Message = "Success",
                        Data = _jwtProvider.GenerateToken(user)
                    });
                }
                else
                {
                    return Unauthorized(new GenericResponse
                    {
                        Success = false,
                        Message = "Invalid Verification Code",
                        Data = null
                    });
                }

            }

            if (!_twilioServices.VerifySMSVerificationCode(request.Phone!, request.OTP!))
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Verification Code",
                    Data = null
                });
            }

            var token = _jwtProvider.GenerateToken(user);
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = token
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!_twilioServices.VerifySMSVerificationCode(request.Phone!, request.OTP!))
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Verification Code",
                    Data = null
                });
            }

            Customer customer = (Customer)await _userServices.CreateCustomer(request);

            var token = _jwtProvider.GenerateToken(customer);
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = token
            });
        }
    }
}

