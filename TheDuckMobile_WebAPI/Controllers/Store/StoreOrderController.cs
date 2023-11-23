using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Controllers.Store
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Staff")]
    public class StoreOrderController : ControllerBase
    {
        private readonly IStoreOrderServices _storeOrderServices;

        public StoreOrderController(IStoreOrderServices storeOrderServices)
        {
            _storeOrderServices = storeOrderServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders(
            [FromQuery] int page = 0,
            [FromQuery] int limit = 5,
            [FromQuery] int orderState = 0
            )
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            OrderState? orderStateEnum = (OrderState)orderState;
            if (orderState == 5)
                orderStateEnum = null;

            var orders = await _storeOrderServices.GetStoreOrder(Guid.Parse(id!), page, limit, orderStateEnum);

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = orders
            });
        }
    }
}
