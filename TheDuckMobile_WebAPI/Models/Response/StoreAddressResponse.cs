using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class StoreAddressResponse
    {
        public Guid StoreId { get; set; }
        public UserAddressResponse? Address { get; set; }
    }
}
