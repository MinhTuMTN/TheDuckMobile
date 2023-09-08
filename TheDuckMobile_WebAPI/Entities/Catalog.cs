using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Catalog
    {
        [Key]
        public byte CatalogId { get; set; }

        [Required]
        public string CatalogName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public Boolean IsDeleted { get; set; }
    }
}
