namespace TheDuckMobile_WebAPI.Models.Request
{
    public class CreateOrderLoggedInRequest
    {
        public List<ProductVersionQuantityRequest>? ProductVersionQuantities { get; set; }
        public OrderAddressRequest? OrderAddress { get; set; }
        public string? OrderNote { get; set; }
        public string? CouponCode { get; set; }

        public CreateOrderLoggedInRequest()
        {
            ProductVersionQuantities = new List<ProductVersionQuantityRequest>();
        }

        public CreateOrderLoggedInRequest(CreateOrderNonLoggedInRequest request)
        {
            ProductVersionQuantities = request.ProductVersionQuantities;
            OrderAddress = request.OrderAddress;
            OrderNote = request.OrderNote;
            CouponCode = request.CouponCode;
        }
    }
}
