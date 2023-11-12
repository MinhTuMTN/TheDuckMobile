using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class EditInformationUserRequest
    {
        [Required(ErrorMessage = "Full name is required")]
        public string? FullName { get; set; }
        [Required(ErrorMessage = "Gender is required")]
        public int? Gender { get; set; }
    }
}
