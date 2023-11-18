using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class CatalogAttributeRequest
    {
        public string? Key { get; set; }
        public string? DisplayName { get; set; }
        public string? Type { get; set; }
        public int? CatalogId { get; set; }
        public bool IsRequired { get; set; }
        public List<string>? SelectionValues { get; set; }
    }
}
