using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TheDuckMobile_WebAPI.Entities
{
    public class SelectionValue
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string? Value { get; set; }

        public string? Key { get; set; }
        [JsonIgnore]
        public CatalogAttribute? CatalogAttribute { get; set; }

        public bool IsDeleted { get; set; }

        public SelectionValue() { }
    }
}
