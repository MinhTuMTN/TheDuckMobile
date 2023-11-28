using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class UpdateStoreRequest
    {
        [Required]
        public string? StoreName { get; set; }
        [Required]
        public int WardId { get; set; }
        [Required]
        public string? StreetName { get; set; }
    }
}
