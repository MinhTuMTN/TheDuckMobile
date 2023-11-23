using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class StoreOrderItemResponse
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double Total { get; set; }
        public string? ProductName { get; set; }
        public string? VersionName { get; set; }

        public StoreOrderItemResponse(OrderItem orderItem)
        {
            Quantity = orderItem.Quantity;
            Price = Math.Min(orderItem.Price, orderItem.PromotionPrice);
            Total = orderItem.Price * orderItem.Quantity;
            ProductName = orderItem.StoreProduct?.ProductVersion?.Product?.ProductName;
            VersionName = orderItem.StoreProduct?.ProductVersion?.VersionName;
        }
    }
}
