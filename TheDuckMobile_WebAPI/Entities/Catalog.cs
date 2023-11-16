using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Catalog
    {
        private readonly ILazyLoader? _lazyLoader;
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CatalogId { get; set; }

        [Required]
        public string? CatalogName { get; set; }
        public string? CatalogURL { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public Boolean IsDeleted { get; set; }

        // Relationship to Brand
        private ICollection<Brand>? _brands;
        [JsonIgnore]
        public virtual ICollection<Brand>? Brands
        {
            get => _lazyLoader.Load(this, ref _brands);
            set => _brands = value;
        }

        // Relationship to SpecialFeature
        private ICollection<SpecialFeature>? _specialFeatures;
        [JsonIgnore]
        public virtual ICollection<SpecialFeature>? SpecialFeatures
        {
            get => _lazyLoader.Load(this, ref _specialFeatures);
            set => _specialFeatures = value;
        }

        // Relationship to Product
        private ICollection<Product>? _products;
        [JsonIgnore]
        public virtual ICollection<Product>? Products
        {
            get => _lazyLoader.Load(this, ref _products);
            set => _products = value;
        }

        private ICollection<CatalogAttribute>? _catalogAttributes;
        [JsonIgnore]
        public virtual ICollection<CatalogAttribute>? CatalogAttributes
        {
            get => _lazyLoader.Load(this, ref _catalogAttributes);
            set => _catalogAttributes = value;
        }

        public Catalog()
        {
            Products = new HashSet<Product>();
        }

        public Catalog(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
