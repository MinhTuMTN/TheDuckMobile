using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class StoreProduct
    {
        private readonly ILazyLoader? _lazyLoader;

        public StoreProduct()
        {
        }

        public StoreProduct(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }


        [Key]
        public Guid StoreProductId { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }
        public bool IsSelling { get; set; }

        //Quan hệ 1-n đến Store
        public Guid StoreId { get; set; }
        [JsonIgnore]
        public virtual Store? Store { get; set; }

        //Quan hệ 1-n đến ProductVersion
        public Guid ProductVersionId { get; set; }
        private ProductVersion? _productVersion;
        [JsonIgnore]
        public virtual ProductVersion? ProductVersion
        {
            get => _lazyLoader.Load(this, ref _productVersion);
            set => _productVersion = value;
        }

        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }


        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDelete { get; set; }

    }
}
