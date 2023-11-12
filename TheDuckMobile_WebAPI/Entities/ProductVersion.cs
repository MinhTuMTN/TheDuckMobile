using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class ProductVersion
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        public Guid ProductVersionId { get; set; }
        public double Price { get; set; }
        public int RAM { get; set; }
        public float ScreenSize { get; set; }
        public int NumberOfSim { get; set; }
        public string? ScreenResolution { get; set; }
        public string? Material { get; set; }
        public int Quantity { get; set; }
        public int Sold { get; set; }
        public string? Battery { get; set; }
        public DateTime ReleaseTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }

        public string[] Images { get; set; }

        public Guid ColorId { get; set; }
        public virtual Color? Color { get; set; }

        public virtual ICollection<StoreProduct>? StoreProducts { get; set; }
        public Guid PromotionId { get; set; }
        public virtual Promotion? Promotion { get; set; }

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
