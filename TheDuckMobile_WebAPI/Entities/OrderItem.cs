using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TheDuckMobile_WebAPI.Entities
{
    public class OrderItem
    {
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int Quantity { get; set; }

        [Range(minimum: 0, maximum: double.MaxValue)]
        public double Price { get; set; }
        public double PromotionPrice { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public bool IsDeleted { get; set; }

        public Guid StoreProductId;
        public virtual StoreProduct? StoreProduct { get; set; }


        public Guid OrderId;
        [JsonIgnore]
        public virtual Order? Order { get; set; }
    }
}
