using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        public virtual ICollection<Catalog> Catalogs { get; set; }
    }
}
