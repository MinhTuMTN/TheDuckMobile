namespace TheDuckMobile_WebAPI.Models.Request
{
    public class UserCartItem
    {
        public Guid ProductVersionId { get; set; }
        public int Quantity { get; set; }
    }
}
