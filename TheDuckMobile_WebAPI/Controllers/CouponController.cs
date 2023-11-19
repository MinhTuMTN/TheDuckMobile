using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
