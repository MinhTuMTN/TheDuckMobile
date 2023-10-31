using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
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
    }
}
