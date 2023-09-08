using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class SpecialFeature
    {
        [Key]
        public Guid SpecialFeatureId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public Boolean IsDeleted { get; set; }

        public virtual ICollection<Catalog> Catalogs { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
