using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class OrderDetailResponse
    {
        public Guid OrderId { get; set; }
        public double Total { get; set; }
        public string? StaffName { get; set; }
        public Customer? Customer { get; set; }
        public string? StreetName { get; set; }
        public string? WardName { get; set; }
        public string? DistrictName { get; set; }
        public string? ProvinceName { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public string? CouponCode { get; set; }
        public string? OrderNote { get; set; }
        public DateTime CreatedAt { get; set; }
        public string OrderState { get; set; }

        public OrderDetailResponse(Order order)
        {
            OrderId = order.OrderId;
            Total = order.Total;
            StaffName = order.Staff?.FullName;
            Customer = order.Customer;
            StreetName = order.Address?.StreetName;
            WardName = order.Address?.Ward?.WardName;
            DistrictName = order.Address?.Ward?.District?.DistrictName;
            ProvinceName = order.Address?.Ward?.District?.Provine?.ProvineName;
            OrderItems = order.OrderItems;
            CouponCode = order.Coupon == null ? "" : order.Coupon.CouponCode;
            OrderNote = order.OrderNote;
            CreatedAt = order.CreatedAt;
            OrderState = order.OrderState.ToString();
        }
    }
}
