using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Controllers.Store
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreStatisticController : ControllerBase
    {
        private readonly IStatisticServices _statisticServices;
        public StoreStatisticController(IStatisticServices statisticServices)
        {
            _statisticServices = statisticServices;
        }

        [HttpGet("{storeId}")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> Statistic(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate,
            [FromRoute] Guid storeId)
        {
            var statistic = await _statisticServices.Statistic(startDate, endDate, storeId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = statistic,
                Message = "Successfully statistic"
            });
        }
    }
}

