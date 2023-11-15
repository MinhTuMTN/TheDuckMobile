using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("list")]
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
    }
}
