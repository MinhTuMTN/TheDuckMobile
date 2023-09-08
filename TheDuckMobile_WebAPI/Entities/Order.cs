using System.ComponentModel.DataAnnotations;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Order
    {
        public Guid OrderId { get; set; }

        [Range(minimum: 0, maximum: double.MaxValue)]
        public double Total { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public OrderState OrderState { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }

        public Guid CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
