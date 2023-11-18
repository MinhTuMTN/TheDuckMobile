using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class CatalogAttribute
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CatalogAttributeId { get; set; }
        public string? Key { get; set; }
        public string? DisplayName { get; set; }
        public CatalogAttributeType Type { get; set; }

        public int CatalogId { get; set; }
        public Catalog? Catalog { get; set; }

        public bool IsRequired { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<SelectionValue>? SelectionValues { get; set; }

        public CatalogAttribute()
        {
            this.SelectionValues = new HashSet<SelectionValue>();
        }
    }
}
