using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class StoreProduct
    {
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        [Key]
        public Guid StoreProductId { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity {get; set; }
        public bool IsSelling { get; set; }
        public DateTime CreatAt { get; set; }
        public DateTime LastModifiedAt { get; set; }   
        public bool IsDelete { get; set; }

        //Quan hệ 1-n đến Store
        public Guid StoreId { get; set; }
        public virtual Store Store { get; set; }

        //Quan hệ 1-n đến ProductVersion
        public Guid ProductVersionId { get; set; }
        public virtual ProductVersion ProductVersion { get; set; }

    }
}
