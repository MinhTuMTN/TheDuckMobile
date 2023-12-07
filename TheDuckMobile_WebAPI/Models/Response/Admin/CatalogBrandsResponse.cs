namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CatalogBrandsResponse
    {
        public List<BrandItem>? NotAvailableBrands { get; set; }
        public List<BrandItem>? AvailableBrands { get; set; }
    }
}
