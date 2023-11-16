using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class EditProductRequest
    {
        [Required(ErrorMessage = "Product name is required")]
        public string? ProductName { get; set; }
        [Required(ErrorMessage = "Product description is required")]
        public string? ProductDescription { get; set; }
        [Required(ErrorMessage = "Quantity is required")]
        public int Quantity { get; set; }
    }
}
