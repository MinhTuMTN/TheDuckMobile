using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Controllers.Store
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Staff")]
    public class StoreStatisticController : ControllerBase
    {
        private readonly IStatisticServices _statisticServices;
        public StoreStatisticController(IStatisticServices statisticServices)
        {
            _statisticServices = statisticServices;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Statistic(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var statistic = await _statisticServices.Statistic(startDate, endDate, Guid.Parse(id!));
            return Ok(new GenericResponse
            {
                Success = true,
                Data = statistic,
                Message = "Successfully statistic"
            });
        }
    }
}

