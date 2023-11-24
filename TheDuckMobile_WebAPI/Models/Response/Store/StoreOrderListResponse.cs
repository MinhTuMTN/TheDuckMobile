using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class StoreOrderListResponse
    {
        public Guid OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public OrderState OrderState { get; set; }
        public double Total { get; set; }
    }
}
