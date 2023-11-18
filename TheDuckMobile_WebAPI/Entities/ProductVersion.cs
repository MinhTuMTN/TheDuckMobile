using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class ProductVersion
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        public Guid ProductVersionId { get; set; }
        public double Price { get; set; }
        public double PromotionPrice { get; set; }
        public DateTime ReleaseTime { get; set; }
        public int Quantity { get; set; }
        public int Sold { get; set; }

        // Store Specification in JSON
        public string? Specification { get; set; }


        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }

        public string[] Images { get; set; }

        public Guid ProductId { get; set; }
        private Product? _product;
        [JsonIgnore]
        public virtual Product? Product
        {
            get => _lazyLoader.Load(this, ref _product);
            set => _product = value;
        }

        public Guid ColorId { get; set; }
        public virtual Color? Color { get; set; }

        public virtual ICollection<StoreProduct>? StoreProducts { get; set; }

        public virtual ICollection<Promotion>? Promotions { get; set; }

        public ProductVersion()
        {
            Images = new string[0];
        }

        public ProductVersion(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
            Images = new string[0];
        }
    }
}
