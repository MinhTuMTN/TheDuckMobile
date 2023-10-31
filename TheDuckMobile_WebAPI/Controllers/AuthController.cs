using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Config;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly JwtProvider _jwtProvider;

        public AuthController(JwtProvider jwtProvider, DataContext context)
        {
            _jwtProvider = jwtProvider;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Account!.Email == request.Email);
            if (user == null)
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid email or password",
                    Data = null
                });
            }
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Account!.Password))
            {
                return Unauthorized(new GenericResponse
                {
                    Success = false,
                    Message = "Invalid email or password",
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
            var user = new User()
            {
                Avatar = "https://i.imgur.com/1qk9n0F.png",
                FullName = request.FullName,
                CreatedAt = DateTime.Now,
                DateOfBirth = request.DateOfBirth,
                Gender = request.Gender,
                Phone = request.Phone,
                IsDeleted = false,
                Account = new Account()
                {
                    Email = request.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
                },
                LastModifiredAt = DateTime.Now,
                UserId = Guid.NewGuid()
            };

            await _context.Users.AddAsync(user);
            var success = await _context.SaveChangesAsync() > 0;
            if (success)
            {
                return Ok(new GenericResponse
                {
                    Success = true,
                    Message = "Success",
                    Data = user
                });
            }
            else
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to register",
                    Data = null
                });
            }
        }
    }
}

