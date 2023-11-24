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

        // Get Order Details
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderDetails(Guid orderId)
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var orderDetails = await _storeOrderServices.GetStoreOrderDetails(Guid.Parse(id!), orderId);

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = orderDetails
            });
        }

        [HttpGet("{orderId}/confirm")]
        public async Task<IActionResult> ConfirmOrder(Guid orderId)
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _storeOrderServices.ConfirmStoreOrder(Guid.Parse(id!), orderId);
            if (!result)
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to confirm order",
                    Data = null
                });

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = null
            });
        }

        // Confirm Delivery Order
        [HttpGet("{orderId}/delivery")]
        public async Task<IActionResult> ConfirmDeliveryOrder(Guid orderId)
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _storeOrderServices.ConfirmDeliveryOrder(Guid.Parse(id!), orderId);
            if (!result)
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to confirm delivery order",
                    Data = null
                });

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = null
            });
        }

        // Cancel Order
        [HttpGet("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(Guid orderId)
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _storeOrderServices.CancelStoreOrder(Guid.Parse(id!), orderId);
            if (!result)
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to cancel order",
                    Data = null
                });

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = null
            });
        }

        // Confirm Complete Order
        [HttpGet("{orderId}/complete")]
        public async Task<IActionResult> CompleteOrder(Guid orderId)
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _storeOrderServices.ConfirmCompletedOrder(Guid.Parse(id!), orderId);
            if (!result)
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to complete order",
                    Data = null
                });

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = null
            });
        }
    }
}
