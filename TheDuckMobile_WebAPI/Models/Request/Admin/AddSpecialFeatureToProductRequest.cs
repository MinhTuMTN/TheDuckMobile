using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class AddSpecialFeatureToProductRequest
    {
        [Required(ErrorMessage = "Special Feature Id is required")]
        public int? SpecialFeatureId { get; set; }
    }
}
