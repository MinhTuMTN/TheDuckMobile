using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CatalogAttributeResponse
    {
        public int CatalogAttributeId { get; set; }
        public string? CatalogAttributeName { get; set; }
        public string? CatalogAttributeKey { get; set; }
        public bool IsRequired { get; set; }
        public CatalogAttributeType CatalogAttributeType { get; set; }
        public List<SelectionValueItemResponse> SelectionValues { get; set; } = new List<SelectionValueItemResponse>();
    }
}
