using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class OS
    {
        [Key]
        public byte OSId { get; set; }

        [Required]
        public string OSName { get; set;}

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public Boolean IsDeleted { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
