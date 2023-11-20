namespace TheDuckMobile_WebAPI.Models.Request
{
    public class CreateOrderNonLoggedInRequest
    {
        public List<ProductVersionQuantityRequest>? ProductVersionQuantities { get; set; }
        public OrderAddressRequest? OrderAddress { get; set; }
        public string? OrderNote { get; set; }
        public string? CouponCode { get; set; }
        public TemporaryCustomerRequest? TemporaryCustomer { get; set; }
    }
}
