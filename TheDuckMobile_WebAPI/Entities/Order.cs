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

        public Guid StaffId { get; set; }
        private Staff? _staff;
        [JsonIgnore]
        public virtual Staff? Staff
        {
            get => _lazyLoader.Load(this, ref _staff);
            set => _staff = value;
        }

        public Guid CustomerId { get; set; }
        private Customer? _customer;
        [JsonIgnore]
        public virtual Customer? Customer
        {
            get => _lazyLoader.Load(this, ref _customer);
            set => _customer = value;
        }

        public Guid AddressId { get; set; }
        private Address? _address;
        [JsonIgnore]
        public virtual Address? Address
        {
            get => _lazyLoader.Load(this, ref _address);
            set => _address = value;
        }

        public Guid CouponId { get; set; }
        private Coupon? _coupon;
        [JsonIgnore]
        public virtual Coupon? Coupon
        {
            get => _lazyLoader.Load(this, ref _coupon);
            set => _coupon = value;
        }

        public Order(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
