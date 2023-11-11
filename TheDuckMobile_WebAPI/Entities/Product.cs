using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }

        [Required]
        public string? ProductName { get; set; }

        public string? ProductDescription { get; set; }

        public float Rate { get; set; }

        public int Quantity { get; set; }

        public int Sold { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public bool IsDeleted { get; set; }

        public int BrandId { get; set; }
        public virtual Brand? Brand { get; set; }

        public virtual ICollection<Vote>? Votes { get; set; }

        public virtual ICollection<ProductVersion>? ProductVersions { get; set; }


        public int OSId { get; set; }
        public virtual OS? OS { get; set; }

        public int CatalogId { get; set; }
        public virtual Catalog? Catalog { get; set; }

        public virtual ICollection<SpecialFeature>? SpecialFeatures { get; set; }
    }
}
