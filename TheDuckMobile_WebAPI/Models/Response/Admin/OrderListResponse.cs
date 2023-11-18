using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class OrderListResponse
    {
        public Guid OrderId { get; set; }
        public double Total { get; set; }
        public string? StaffName { get; set; }
        public string? CustomerName { get; set; }
        public string? CouponCode { get; set; }

        public OrderListResponse(Order order)
        {
            OrderId = order.OrderId;
            Total = order.Total;
            StaffName = order.Staff == null ? "" : order.Staff.FullName;
            CustomerName = order.Customer == null ? "" : order.Customer.FullName;
            CouponCode = order.Coupon == null ? "" : order.Coupon.CouponCode;
        }
    }
}
