using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface ICouponServices
    {
        public Task<bool> ExchangeCoupon(Guid userId, int point);
        public Task<Coupon> GetCouponByCouponCode(string couponCode);
        public Task<UserCouponResponse> GetUserCoupon(Guid userId);
    }
}
