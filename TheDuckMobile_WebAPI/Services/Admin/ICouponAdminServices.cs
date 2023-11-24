using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICouponAdminServices
    {
        public Task<List<CouponResponse>> GetAllCoupons();
        public Task<Coupon> GetCouponById(string couponId);
        public Task<Coupon> AddCoupon(CouponRequest request);
        public Task<Coupon> UpdateCoupon(string couponId, CouponRequest request);
        public Task<bool> DeleteCoupon(string couponId);
        public Task<Coupon?> RestoreCoupon(string couponId);
    }
}
