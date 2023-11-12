using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class UserAddressResponse
    {
        public Guid AddressId { get; set; }
        public string? ProvinceName { get; set; }
        public string? DistrictName { get; set; }
        public string? WardName { get; set; }
        public string? Street { get; set; }

        public UserAddressResponse(Address address)
        {
            AddressId = address.AddressId;
            ProvinceName = address.Ward?.District?.Provine?.ProvineName;
            DistrictName = address.Ward?.District?.DistrictName;
            WardName = address.Ward?.WardName;
            Street = address.StreetName;
        }
    }
}
