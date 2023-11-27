using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class UserCouponResponse
    {
        public int Point { get; set; }
        public ICollection<Coupon>? Coupons { get; set; }
    }
}
