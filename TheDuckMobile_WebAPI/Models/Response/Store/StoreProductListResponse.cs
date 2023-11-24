using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class StoreProductListResponse
    {
        public Guid StoreProductId { get; set; }
        public Guid ProductVersionId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductVersionName { get; set; }
        public string? CatalogName { get; set; }
        public string? Thumbnail { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public int Quantity { get; set; }
        public bool IsDeleted { get; set; }

        public StoreProductListResponse(StoreProduct storeProduct)
        {
            StoreProductId = storeProduct.StoreProductId;
            ProductVersionId = storeProduct.ProductVersionId;
            ProductName = storeProduct.ProductVersion!.Product!.ProductName;
            ProductVersionName = storeProduct.ProductVersion!.VersionName;
            CatalogName = storeProduct.ProductVersion!.Product!.Catalog!.CatalogName;
            Thumbnail = storeProduct.ProductVersion.Product.Thumbnail;
            Price = storeProduct.ProductVersion.Price;
            PromotionPrice = storeProduct.ProductVersion.PromotionPrice;
            Quantity = storeProduct.Quantity;
            IsDeleted = storeProduct.ProductVersion.IsDeleted;
        }
    }
}
