using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticAdminController : ControllerBase
    {
        private readonly IStatisticAdminServices _statisticServices;
        public StatisticAdminController(IStatisticAdminServices statisticServices)
        {
            _statisticServices = statisticServices;
        }

        [HttpGet()]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> Statistic([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var statistic = await _statisticServices.Statistic(startDate, endDate);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = statistic,
                Message = "Successfully statistic"
            });
        }
    }
}