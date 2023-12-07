using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class ProductCartResponse
    {
        public Guid ProductVersionId { get; set; }
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? VersionName { get; set; }
        public string? Thumbnail { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public int Quantity { get; set; }
        public int MaxQuantity { get; set; }
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }
        public bool IsDeleted { get; set; }

        public ProductCartResponse()
        {
        }

        public ProductCartResponse(OrderItem orderItem)
        {
            ProductVersionId = orderItem.StoreProduct!.ProductVersionId;
            ProductId = orderItem.StoreProduct!.ProductVersion!.ProductId;
            ProductName = orderItem.StoreProduct!.ProductVersion!.Product!.ProductName;
            VersionName = orderItem.StoreProduct!.ProductVersion!.VersionName;
            Thumbnail = orderItem.StoreProduct!.ProductVersion!.Product!.Thumbnail;
            Price = orderItem.Price;
            PromotionPrice = orderItem.PromotionPrice;
            Quantity = orderItem.Quantity;
            ColorName = orderItem.StoreProduct!.ProductVersion!.Color!.ColorName;
            ColorCode = orderItem.StoreProduct!.ProductVersion!.Color!.ColorCode;
        }
    }
}
