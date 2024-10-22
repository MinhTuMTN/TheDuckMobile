﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class OrderAdminController : ControllerBase
    {
        private readonly IOrderAdminServices _orderAdminServices;
        public OrderAdminController(IOrderAdminServices orderAdminServices)
        {
            _orderAdminServices = orderAdminServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderAdminServices.GetAllOrders();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = orders,
                Message = "Successfully retrieved all orders"
            });
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById([FromRoute] string orderId)
        {
            var order = await _orderAdminServices.GetOrderById(orderId);

            if (order == null)
                throw new BadHttpRequestException("Order could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Order retrieved successfully.",
                Data = order
            });
        }
    }
}
