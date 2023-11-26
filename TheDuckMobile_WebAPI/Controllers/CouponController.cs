using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly ICouponServices _couponServices;

        public CouponController(ICouponServices couponServices)
        {
            _couponServices = couponServices;
        }

        [HttpGet("check")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckCoupon([FromQuery] string couponCode)
        {
            var coupon = await _couponServices.GetCouponByCouponCode(couponCode);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = coupon,
                Message = "Successfully retrieved coupon"
            });
        }

        [HttpPost("points-exchange")]
        [Authorize]
        public async Task<IActionResult> ExchangeCoupon([FromBody] PointExchangeRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var coupon = await _couponServices.ExchangeCoupon(Guid.Parse(userId), request.Point);
            if (!coupon)
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Not enough points to exchange coupon",
                    Data = null
                });
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Successfully exchanged coupon",
                Data = coupon
            });
        }

        [HttpGet("points-exchange")]
        [Authorize]
        public async Task<IActionResult> GetUserCoupon()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var coupon = await _couponServices.GetUserCoupon(Guid.Parse(userId));
            if (coupon is null)
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Coupon not found",
                    Data = null
                });
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Successfully retrieved coupon",
                Data = coupon
            });
        }
    }
}
