using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheDuckMobile_WebAPI.Entities
{
    public class OS
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OSId { get; set; }

        [Required]
        public string? OSName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiedAt { get; set; }

        public bool IsDeleted { get; set; }

        public virtual ICollection<Product>? Products { get; set; }
    }
}
