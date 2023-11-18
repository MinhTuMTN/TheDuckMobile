using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Color
    {
        [Key]
        public Guid ColorId { get; set; }
        [Required]
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }

        [JsonIgnore]
        public ICollection<ProductVersion>? ProductVersions { get; set; }
    }
}
