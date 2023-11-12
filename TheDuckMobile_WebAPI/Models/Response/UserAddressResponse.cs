using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class UserAddressResponse
    {
        public Guid AddressId { get; set; }
        public int? ProvinceId { get; set; }
        public string? ProvinceName { get; set; }
        public int? DistrictId { get; set; }
        public string? DistrictName { get; set; }
        public int? WardId { get; set; }
        public string? WardName { get; set; }
        public string? Street { get; set; }

        public UserAddressResponse(Address address)
        {
            AddressId = address.AddressId;
            ProvinceId = address.Ward?.District?.Provine?.ProvinceId;
            ProvinceName = address.Ward?.District?.Provine?.ProvineName;
            DistrictId = address.Ward?.District?.DistrictId;
            DistrictName = address.Ward?.District?.DistrictName;
            WardId = address.Ward?.WardId;
            WardName = address.Ward?.WardName;
            Street = address.StreetName;
        }
    }
}
