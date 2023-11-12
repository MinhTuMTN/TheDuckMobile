using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class CheckPhoneNumberRequest
    {
        [Required(ErrorMessage = "Phone number is required")]
        public string? Phone { get; set; }
    }
}
