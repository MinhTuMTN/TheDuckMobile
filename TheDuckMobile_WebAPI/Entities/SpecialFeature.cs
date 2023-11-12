using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheDuckMobile_WebAPI.Entities
{

    public class SpecialFeature
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpecialFeatureId { get; set; }

        public string? SpecialFeatureName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public Boolean IsDeleted { get; set; }

        public virtual ICollection<Catalog>? Catalogs { get; set; }

        public virtual ICollection<Product>? Products { get; set; }
    }
}
