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
    public class CouponAdminController : ControllerBase
    {
        private readonly ICouponAdminServices _couponAdminServices;
        public CouponAdminController(ICouponAdminServices couponAdminServices)
        {
            _couponAdminServices = couponAdminServices;
        }

        [HttpGet]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllCoupons()
        {
            var coupons = await _couponAdminServices.GetAllCoupons();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = coupons,
                Message = "Successfully retrieved all coupons"
            });
        }

        [HttpGet("{couponId}")]
        public async Task<IActionResult> GetCouponById([FromRoute] string couponId)
        {
            var coupon = await _couponAdminServices.GetCouponById(couponId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = coupon,
                Message = "Successfully retrieved coupon"
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddCoupon([FromBody] CouponRequest request)
        {
            var coupon = await _couponAdminServices.AddCoupon(request);

            if (coupon == null)
                throw new Exception("Coupon could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "OS added successfully.",
                Data = coupon
            });
        }

        [HttpPut("{couponId}")]
        public async Task<IActionResult> UpdateCoupon([FromRoute] string couponId, [FromBody] CouponRequest request)
        {
            var coupon = await _couponAdminServices.UpdateCoupon(couponId, request);

            if (coupon == null)
                throw new Exception("Coupon could not be updated.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Coupon updated successfully.",
                Data = coupon
            });
        }

        [HttpDelete("{couponId}")]
        public async Task<IActionResult> DeleteCoupon([FromRoute] string couponId)
        {
            var success = await _couponAdminServices.DeleteCoupon(couponId);

            if (success == false)
                throw new Exception("Coupon could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Coupon deleted successfully.",
                Data = null
            });
        }

        [HttpGet("restore/{couponId}")]
        public async Task<IActionResult> RestoreCoupon([FromRoute] string couponId)
        {
            var coupon = await _couponAdminServices.RestoreCoupon(couponId);

            if (coupon == null)
                throw new BadHttpRequestException("Coupon could not be restored.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Coupon restored successfully.",
                Data = coupon
            });
        }
    }
}
