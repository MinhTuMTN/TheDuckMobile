using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserServices _userServices;
        public UsersController(DataContext context, IUserServices userServices)
        {
            _context = context;
            _userServices = userServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.FindAsync(Guid.Parse(id!));
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = user
            });
        }

        [HttpPost]
        public async Task<IActionResult> EditInformationUser([FromBody] EditInformationUserRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            User? user = await _userServices.EditInformationUser(Guid.Parse(id!), request);

            if (user == null)
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Edit Information User Failed"
                });

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Edit Information User Success",
                Data = user
            });
        }
    }
}
