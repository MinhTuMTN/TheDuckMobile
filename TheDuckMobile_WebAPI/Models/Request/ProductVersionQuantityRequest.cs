namespace TheDuckMobile_WebAPI.Models.Request
{
    public class ProductVersionQuantityRequest
    {
        public Guid ProductVersionId { get; set; }
        public int Quantity { get; set; }
    }
}
