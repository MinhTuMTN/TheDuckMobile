using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Color
    {
        [Key]
        public Guid ColorId { get; set; }
        [Required]
        public string ColorName { get; set; }
        public string ColorIcon { get; set; }
        public string ImagesJson
        {
            get
            {
                return JsonSerializer.Serialize(Images);
            }
            set
            {
                Images = JsonSerializer.Deserialize<List<string>>(value);
            }
        }
        [NotMapped]
        public List<string> Images { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<ProductVersion> ProductVersions { get; set; }

        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
