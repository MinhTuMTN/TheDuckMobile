using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services
{
    public interface ICouponServices
    {
        public Task<Coupon> GetCouponByCouponCode(string couponCode);
    }
}
