using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class OrderItem
    {
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int Quantity { get; set; }

        [Range(minimum: 0, maximum: double.MaxValue)]
        public double Price { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public bool IsDeleted { get; set; }

        public Guid PromotionId { get; set; }
        public virtual Promotion? Promotion { get; set; }

        public Guid StoreProductId;
        public virtual StoreProduct? StoreProduct { get; set; }


        public Guid OrderId;
        public virtual Order? Order { get; set; }
    }
}
