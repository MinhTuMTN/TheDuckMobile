using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class AddStoreRequest
    {
        [Required(ErrorMessage = "Store name is required")]
        public string? StoreName { get; set; }

        [Range(minimum: 0, maximum: 23)]
        public int OpenHours { get; set; }

        [Range(minimum: 0, maximum: 59)]
        public int OpenMinutes { get; set; }

        [Range(minimum: 0, maximum: 23)]
        public int CloseHours { get; set; }

        [Range(minimum: 0, maximum: 59)]
        public int CloseMinutes { get; set; }

        [Required(ErrorMessage = "Ward is required")]
        public int WardId { get; set; }

        [Required(ErrorMessage = "Street is required")]
        public string? Street { get; set; }
    }
}
