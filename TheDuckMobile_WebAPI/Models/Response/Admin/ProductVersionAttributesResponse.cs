using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProductVersionAttributesResponse
    {
        public int Id { get; set; }
        public string? Key { get; set; }
        public string? DisplayName { get; set; }
        public bool? IsRequired { get; set; }
        public CatalogAttributeType? Type { get; set; }
        public List<string>? SelectionValues { get; set; }
    }
}
