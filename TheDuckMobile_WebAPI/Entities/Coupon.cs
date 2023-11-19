using System.Text.Json.Serialization;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Coupon
    {
        public Guid CouponId { get; set; }
        public string? CouponCode { get; set; }
        public int Discount { get; set; }
        public double MinPrice { get; set; }
        public double MaxDiscount { get; set; }
        public int MaxUse { get; set; }
        public int CurrentUse { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get; set; }
    }
}
