namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class CouponRequest
    {
        public string? CouponCode { get; set; }
        public int Discount { get; set; }
        public double MinPrice { get; set; }
        public double MaxDiscount { get; set; }
        public int MaxUse { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrentUse { get; set; }
    }
}
