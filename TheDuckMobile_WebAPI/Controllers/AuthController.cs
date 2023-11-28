using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.RegularExpressions;
using TheDuckMobile_WebAPI.Config;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtProvider _jwtProvider;
        private readonly IUserServices _userServices;
        private readonly IMSGraphAPIServices _mSGraphAPIServices;
        private readonly IConfiguration _configuration;
        private readonly ISMSServices _smsServices;

        public AuthController(
            JwtProvider jwtProvider,
            ISMSServices smsServices,
            IUserServices userServices,
            IConfiguration configuration,
            IMSGraphAPIServices mSGraphAPIServices)
        {
            _jwtProvider = jwtProvider;
            _smsServices = smsServices;
            _userServices = userServices;
            _configuration = configuration;
            _mSGraphAPIServices = mSGraphAPIServices;
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

            var sentSMS = await _smsServices.SendSMSVerificationCode(request.Phone!);
            if (sentSMS is null || (bool)sentSMS == false)
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

            var isVerified = await _smsServices.VerifySMSVerificationCode(request.Phone!, request.OTP!);
            if (!isVerified)
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

        [HttpPost("staff-login")]
        public async Task<IActionResult> StaffLogin([FromBody] StaffLoginRequest request)
        {
            var result = await _userServices.StaffLogin(request.Email!, request.OTP!);

            if (!result)
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Email or OTP",
                    Data = null
                });
            }

            var user = await _userServices.FindUserByEmail(request.Email!);
            if (user == null)
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Email",
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
            bool valid = await _smsServices.VerifySMSVerificationCode(request.Phone!, request.OTP!);
            if (!valid)
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

        [HttpGet("check-token")]
        [Authorize]
        public async Task<IActionResult> CheckToken()
        {
            // Get user id from token
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userServices.FindUserByUserId(Guid.Parse(id!));

            if (user == null)
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Token",
                    Data = null
                });
            }

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = user is Customer ? "Customer" : (user is Entities.Admin ? "Admin" : "Staff")
            });
        }

        [HttpPost("check-staff-email")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckStaffEmail([FromBody] CheckStaffEmailRequest request)
        {
            // Check email format is valid and belongs to minhtunguyen.onmicrosoft.com
            Regex regex = new Regex(@"^([a-zA-Z0-9_\-\.]+)@minhtunguyen\.onmicrosoft\.com$");

            if (!regex.IsMatch(request.Email!))
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid Email",
                    Data = null
                });
            }

            var exist = await _userServices.CheckStaffExists(request.Email!);

            if (exist)
            {
                var result = await _userServices.CheckAndSendOTP(request.Email!);
                return Ok(new GenericResponse
                {
                    Success = true,
                    Message = "Email is already in use",
                    Data = true
                });
            }
            else
            {
                return Ok(new GenericResponse
                {
                    Success = true,
                    Message = "Email is not in use",
                    Data = false
                });
            }
        }
    }
}

