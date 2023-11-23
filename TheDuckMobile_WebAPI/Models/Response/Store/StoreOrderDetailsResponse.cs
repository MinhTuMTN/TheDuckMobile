using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class StoreOrderDetailsResponse
    {
        public Guid OrderId { get; set; }
        public CustomerOrderDetailsResponse? Customer { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? CouponCode { get; set; }
        public string? OrderNote { get; set; }
        public double ShippingFee { get; set; }
        public double? Discount { get; set; }
        public double Total { get; set; }
        public OrderState OrderState { get; set; }
        public List<StoreOrderItemResponse>? Items { get; set; }


        public StoreOrderDetailsResponse(Order order)
        {
            OrderId = order.OrderId;
            Customer = order.Customer == null
                ? new CustomerOrderDetailsResponse(order.TemporaryCustomer!, order.Address!)
                : new CustomerOrderDetailsResponse(order.Customer!, order.Address!);
            CreatedAt = order.CreatedAt;
            CouponCode = order.Coupon?.CouponCode;
            Total = order.Total;
            OrderState = order.OrderState;
            Items = new List<StoreOrderItemResponse>();
            OrderNote = order.OrderNote;
            ShippingFee = 20000;
            Discount = order.Discount;
            foreach (var item in order.OrderItems!)
                Items.Add(new StoreOrderItemResponse(item));
        }
    }
}
