using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class OrderDetailsUserResponse
    {
        public Guid OrderId { get; set; }
        public string? ReceiverName { get; set; }
        public UserAddressResponse? Address { get; set; }
        public Order? order { get; set; }
        public ICollection<OrderItemUserResponse>? OrderItems { get; set; }

        public OrderDetailsUserResponse()
        {
            OrderItems = new List<OrderItemUserResponse>();
        }

        public OrderDetailsUserResponse(Order order)
        {
            OrderId = order.OrderId;
            ReceiverName = order.Customer!.FullName;
            Address = new UserAddressResponse(order.Address!);
            this.order = order;
            OrderItems = order.OrderItems?
                .Select(orderItem => new OrderItemUserResponse(orderItem))
                .ToList();
        }
    }
}
