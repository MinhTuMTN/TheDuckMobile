using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class OrderListUserResponse
    {
        public Guid OrderId { get; set; }
        public OrderState OrderState { get; set; }
        public double TotalPrice { get; set; }
        public ICollection<OrderItemUserResponse>? OrderItems { get; set; }

        public OrderListUserResponse()
        {
            OrderItems = new List<OrderItemUserResponse>();
        }

        public OrderListUserResponse(Order order)
        {
            OrderId = order.OrderId;
            OrderState = order.OrderState;
            TotalPrice = order.Total;
            OrderItems = order.OrderItems?
                .Select(orderItem => new OrderItemUserResponse(orderItem))
                .ToList();
        }
    }
}
