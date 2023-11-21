using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }

        [Range(minimum: 0, maximum: double.MaxValue)]
        public double Total { get; set; }

        public string? OrderNote { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public OrderState OrderState { get; set; }

        public virtual ICollection<OrderItem>? OrderItems { get; set; }


        public Guid StoreId { get; set; }
        [JsonIgnore]
        public virtual Store? Store { get; set; }

        public Guid? StaffId { get; set; }
        [JsonIgnore]
        public virtual Staff? Staff { get; set; }

        public Guid? CustomerId { get; set; }
        [JsonIgnore]
        public virtual Customer? Customer { get; set; }

        public Guid? AddressId { get; set; }
        public virtual Address? Address { get; set; }

        public Guid? CouponId { get; set; }
        public virtual Coupon? Coupon { get; set; }

        public Guid? TemporaryCustomerId { get; set; }
        [JsonIgnore]
        public virtual TemporaryCustomer? TemporaryCustomer { get; set; }
    }
}
