using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class CouponServicesImpl : ICouponServices
    {
        private readonly DataContext _context;

        public CouponServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<Coupon> GetCouponByCouponCode(string couponCode)
        {
            var coupon = await _context
                .Coupons
                .Where(c => c.CouponCode == couponCode
                    && c.IsDeleted == false
                )
                .OrderByDescending(c => c.CreatedAt)
                .FirstOrDefaultAsync();

            if (coupon is null)
                throw new ExceptionWithStatusCode(411, "Coupon is not valid");

            if (coupon.StartDate > DateTime.Now)
                throw new ExceptionWithStatusCode(412, "Coupon is not valid yet");

            if (coupon.EndDate < DateTime.Now)
                throw new ExceptionWithStatusCode(413, "Coupon is expired");

            if (coupon.CurrentUse >= coupon.MaxUse)
                throw new ExceptionWithStatusCode(414, "Coupon is out of use");

            return coupon;

        }
    }
}
