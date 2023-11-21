using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class CouponAdminServicesImpl : ICouponAdminServices
    {
        private readonly DataContext _context;

        public CouponAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<CouponResponse>> GetAllCoupons()
        {
            var coupons = await _context.Coupons.ToListAsync();
            return coupons.Select(c => new CouponResponse(c)).ToList();
        }

        public async Task<Coupon> GetCouponById(string couponId)
        {
            Guid guid = Guid.Parse(couponId);
            var coupon = await _context.Coupons
                .FirstOrDefaultAsync(c => c.CouponId == guid);

            if (coupon == null)
                throw new CustomNotFoundException("Can't found coupon");

            return coupon;
        }

        public async Task<Coupon> AddCoupon(CouponRequest request)
        {
            var coupon = new Coupon
            {
                CouponCode = request.CouponCode,
                Discount = request.Discount,
                MinPrice = request.MinPrice,
                MaxDiscount = request.MaxDiscount,
                MaxUse = request.MaxUse,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                CurrentUse = 0,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now,
                IsDeleted = false
            };

            await _context.Coupons.AddAsync(coupon);
            await _context.SaveChangesAsync();

            return coupon;
        }

        public async Task<Coupon> UpdateCoupon(string couponId, CouponRequest request)
        {
            var coupon = await GetCouponById(couponId);

            coupon.CouponCode = request.CouponCode;
            coupon.Discount = request.Discount;
            coupon.MinPrice = request.MinPrice;
            coupon.MaxDiscount = request.MaxDiscount;
            coupon.MaxUse = request.MaxUse;
            coupon.StartDate = request.StartDate;
            coupon.EndDate = request.EndDate;
            coupon.CurrentUse = request.CurrentUse;
            coupon.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return coupon;
        }

        public async Task<bool> DeleteCoupon(string couponId)
        {
            var coupon = await GetCouponById(couponId);

            coupon.IsDeleted = true;
            coupon.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return coupon.IsDeleted;
        }

        public async Task<Coupon?> RestoreCoupon(string couponId)
        {
            var coupon = await GetCouponById(couponId);

            coupon.IsDeleted = false;
            coupon.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return coupon;
        }
    }
}
