using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class OrderDetailResponse
    {
        public Guid OrderId { get; set; }
        public double Total { get; set; }
        public Staff? Staff { get; set; }
        public Customer? Customer { get; set; }
        public Address? Address { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public string? CouponCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public string OrderState { get; set; }

        public OrderDetailResponse(Order order)
        {
            OrderId = order.OrderId;
            Total = order.Total;
            Staff = order.Staff;
            Customer = order.Customer;
            Address = order.Address;
            OrderItems = order.OrderItems;
            CouponCode = order.Coupon == null ? "" : order.Coupon.CouponCode;
            CreatedAt = order.CreatedAt;
            OrderState = order.OrderState.ToString();
        }
    }
}
