using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class ColorRequest
    {
        [Required(ErrorMessage = "Color name is required")]
        public string? ColorName { get; set; }
        [Required(ErrorMessage = "Color code is required")]
        public string? ColorCode { get; set; }
    }
}
