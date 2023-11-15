using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class UserAddAddressRequest
    {
        [Required(ErrorMessage = "Ward is required")]
        public int WardId { get; set; }
        [Required(ErrorMessage = "Street is required")]
        public string? Street { get; set; }
    }
}
