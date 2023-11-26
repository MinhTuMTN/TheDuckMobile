using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class CouponServicesImpl : ICouponServices
    {
        private readonly DataContext _context;

        public CouponServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> ExchangeCoupon(Guid userId, int point)
        {
            var user = await _context
                .Customers
                .Where(c => c.UserId == userId)
                .FirstOrDefaultAsync();

            if (user is null)
                throw new ExceptionWithStatusCode(404, "User not found");

            // Check if user has enough points
            if (user.Point < point)
                throw new ExceptionWithStatusCode(405, "Not enough points to exchange coupon");

            // Create coupon 100% discount, max discount = point, max use = 1, end after 7 day with generated coupon code 8 characters
            var coupon = new Coupon
            {
                CouponCode = Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                Discount = 100,
                MaxDiscount = point,
                MaxUse = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(7),
                CreatedAt = DateTime.Now,
                IsDeleted = false
            };

            await _context.Coupons.AddAsync(coupon);

            if (user.Coupons is null)
                user.Coupons = new List<Coupon>();

            user.Coupons!.Add(coupon);
            user.Point -= point;

            await _context.SaveChangesAsync();
            return true;
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

        public async Task<UserCouponResponse> GetUserCoupon(Guid userId)
        {
            var user = await _context
                .Customers
                .Include(c => c.Coupons)
                .Where(c => c.UserId == userId)
                .FirstOrDefaultAsync();

            if (user is null)
                throw new ExceptionWithStatusCode(404, "User not found");

            return new UserCouponResponse
            {
                Point = user.Point,
                Coupons = user.Coupons
            };
        }
    }
}
