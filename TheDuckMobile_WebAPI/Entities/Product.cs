﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Product
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        public Guid ProductId { get; set; }

        [Required]
        public string? ProductName { get; set; }
        public double? ProductPrice { get; set; }
        public double? PromotionPrice { get; set; }
        public string? Thumbnail { get; set; }

        public string? ProductDescription { get; set; }

        public float Rate { get; set; }

        public int Quantity { get; set; }

        public int Sold { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public bool IsDeleted { get; set; }

        public int BrandId { get; set; }
        private Brand? _brand;

        [JsonIgnore]
        public virtual Brand? Brand
        {
            get => _lazyLoader.Load(this, ref _brand);
            set => _brand = value;
        }

        private ICollection<Vote>? _votes;
        [JsonIgnore]
        public virtual ICollection<Vote>? Votes
        {
            get => _lazyLoader.Load(this, ref _votes);
            set => _votes = value;
        }

        [JsonIgnore]
        public virtual ICollection<ProductVersion>? ProductVersions { get; set; }


        public int? OSId { get; set; }
        [JsonIgnore]
        public virtual OS? OS { get; set; }

        public int? CatalogId { get; set; }
        private Catalog? _catalog;
        public virtual Catalog? Catalog
        {
            get => _lazyLoader.Load(this, ref _catalog);
            set => _catalog = value;
        }

        private ICollection<SpecialFeature>? _specialFeatures;
        [JsonIgnore]
        public virtual ICollection<SpecialFeature>? SpecialFeatures
        {
            get => _lazyLoader.Load(this, ref _specialFeatures);
            set => _specialFeatures = value;
        }

        public Product(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
            Votes = new HashSet<Vote>();
        }

        public Product()
        {
            Votes = new HashSet<Vote>();
        }
    }
}
