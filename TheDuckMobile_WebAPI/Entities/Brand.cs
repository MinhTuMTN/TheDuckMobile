using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Brand
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BrandId { get; set; }
        [Required]
        public string? BrandName { get; set; }
        public string? Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        // Relationship to Product
        private ICollection<Product>? _products;
        [JsonIgnore]
        public virtual ICollection<Product>? Products
        {
            get => _lazyLoader.Load(this, ref _products);
            set => _products = value;
        }

        // Relationship to Catalog
        private ICollection<Catalog>? _catalogs;
        [JsonIgnore]
        public virtual ICollection<Catalog>? Catalogs
        {
            get => _lazyLoader.Load(this, ref _catalogs);
            set => _catalogs = value;
        }

        public Brand()
        {

        }

        public Brand(ILazyLoader? lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
