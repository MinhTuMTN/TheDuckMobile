using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Order
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        public Guid OrderId { get; set; }

        [Range(minimum: 0, maximum: double.MaxValue)]
        public double Total { get; set; }

        public string? OrderNote { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public OrderState OrderState { get; set; }

        private ICollection<OrderItem>? _orderItems;
        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems
        {
            get => _lazyLoader.Load(this, ref _orderItems);
            set => _orderItems = value;
        }


        public Guid StoreId { get; set; }
        private Store? _store;
        [JsonIgnore]
        public virtual Store? Store
        {
            get => _lazyLoader.Load(this, ref _store);
            set => _store = value;
        }

        public Guid? StaffId { get; set; }
        public virtual Staff? Staff { get; set; }

        public Guid? CustomerId { get; set; }
        public virtual Customer? Customer { get; set; }

        public Guid? AddressId { get; set; }
        public virtual Address? Address { get; set; }

        public Guid? CouponId { get; set; }
        public virtual Coupon? Coupon { get; set; }

        public Guid? TemporaryCustomerId { get; set; }
        public virtual TemporaryCustomer? TemporaryCustomer { get; set; }
    }
}
