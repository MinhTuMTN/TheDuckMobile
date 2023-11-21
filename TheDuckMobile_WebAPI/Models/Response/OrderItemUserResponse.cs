using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class OrderItemUserResponse
    {
        public string? ProductName { get; set; }
        public string? VersionName { get; set; }
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }
        public string? Thumbnail { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }

        public OrderItemUserResponse()
        {
        }

        public OrderItemUserResponse(OrderItem orderItem)
        {
            ProductName = orderItem.StoreProduct?.ProductVersion!.Product!.ProductName;
            VersionName = orderItem.StoreProduct?.ProductVersion!.VersionName;
            ColorName = orderItem.StoreProduct?.ProductVersion!.Color!.ColorName;
            ColorCode = orderItem.StoreProduct?.ProductVersion!.Color!.ColorCode;
            Thumbnail = orderItem.StoreProduct?.ProductVersion!.Product!.Thumbnail;
            Quantity = orderItem.Quantity;
            Price = orderItem.Price;
            PromotionPrice = orderItem.PromotionPrice;
        }
    }
}
