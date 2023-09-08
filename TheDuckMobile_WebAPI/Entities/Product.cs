using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }

        public string ProductDescription { get; set; }

        public float Rate { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public Boolean IsDeleted { get; set; }

        public int BrandId { get; set; }
        public virtual Brand Brand { get; set;  }

        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<Color> Colors { get; set; }

        public byte OSId { get; set; }
        public virtual OS OS { get; set; }

        public virtual ICollection<SpecialFeature> SpecialFeatures { get; set; }
    }
}
