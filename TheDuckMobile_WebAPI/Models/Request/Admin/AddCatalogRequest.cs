using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class AddCatalogRequest
    {
        [Required(ErrorMessage = "Catalog name is required")]
        public string? CatalogName { get; set; }
        [Required(ErrorMessage = "Catalog URL is required")]
        public string? CatalogURL { get; set; }
    }
}
