using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class AddBrandToCatalogRequest
    {
        [Required(ErrorMessage = "BrandId is required")]
        public int? BrandId { get; set; }
    }
}
