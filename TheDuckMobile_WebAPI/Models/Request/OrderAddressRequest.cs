namespace TheDuckMobile_WebAPI.Models.Request
{
    public class OrderAddressRequest
    {
        public Guid AddressId { get; set; }
        public string? StreetName { get; set; }
        public int WardId { get; set; }
        public bool StoreId { get; set; }
    }
}
