﻿using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderServices _orderServices;

        public OrderController(IOrderServices orderServices)
        {
            _orderServices = orderServices;
        }

        [HttpPost("create-order-logged-in")]
        [Authorize]
        public async Task<IActionResult> CreateOrderLoggedIn([FromBody] CreateOrderLoggedInRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var success = await _orderServices.CreateOrderLoggedIn(request, Guid.Parse(id!));
            if (!success)
                return BadRequest("Failed to create order");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Order created successfully"
            });
        }

        [HttpPost("create-order-non-logged-in")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateOrderNonLoggedIn([FromBody] CreateOrderNonLoggedInRequest request)
        {
            var success = await _orderServices.CreateOrderNonLoggedIn(request);
            if (!success)
                return BadRequest("Failed to create order");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Order created successfully"
            });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserOrders([FromQuery] int page = 0,
            [FromQuery] int limit = 1)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var paginationOrders = await _orderServices.GetUserOrders(
                Guid.Parse(id!), page, limit);

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = paginationOrders
            });
        }

        [HttpGet("{orderId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderDetails([FromRoute] Guid orderId)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var orderDetails = await _orderServices.GetOrderDetails(Guid.Parse(id!), orderId);

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = orderDetails
            });
        }

        [HttpGet("{orderId}/cancel")]
        [Authorize]
        public async Task<IActionResult> CancelOrder(Guid orderId)
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _orderServices.CancelOrder(Guid.Parse(id!), orderId);
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
    }
}
