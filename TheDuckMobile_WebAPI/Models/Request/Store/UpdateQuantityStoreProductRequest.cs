using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Store
{
    public class UpdateQuantityStoreProductRequest
    {
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
