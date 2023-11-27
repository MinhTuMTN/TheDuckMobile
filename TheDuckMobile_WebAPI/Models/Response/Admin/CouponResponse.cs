using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CouponResponse
    {
        public Guid CouponId { get; set; }
        public string? CouponCode { get; set; }
        public int Discount { get; set; }
        public double MinPrice { get; set; }
        public double MaxDiscount { get; set; }
        public int MaxUse { get; set; }
        public int Remain { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrentUse { get; set; }
        public bool IsDeleted { get; set; }
        
        public CouponResponse(Coupon coupon)
        {
            CouponId = coupon.CouponId;
            CouponCode = coupon.CouponCode;
            Discount = coupon.Discount;
            MinPrice = coupon.MinPrice;
            MaxUse = coupon.MaxUse;
            MaxDiscount = coupon.MaxDiscount;
            StartDate = coupon.StartDate;
            EndDate = coupon.EndDate;
            Remain = coupon.MaxUse - coupon.CurrentUse;
            CurrentUse = coupon.CurrentUse;
            IsDeleted = coupon.IsDeleted;
        }
    }
}
