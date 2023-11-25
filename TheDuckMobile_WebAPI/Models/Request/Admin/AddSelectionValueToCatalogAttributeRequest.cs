using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class AddSelectionValueToCatalogAttributeRequest
    {
        [Required(ErrorMessage = "Selection Value is required")]
        public string? SelectionValue { get; set; }
    }
}
