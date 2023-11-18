using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class AddSpecialFeatureToCatalogRequest
    {
        [Required(ErrorMessage = "SpecialFeatureId is required")]
        public int? SpecialFeatureId { get; set; }
    }
}
