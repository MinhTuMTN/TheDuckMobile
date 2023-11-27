using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class CheckStaffEmailRequest
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
    }
}
