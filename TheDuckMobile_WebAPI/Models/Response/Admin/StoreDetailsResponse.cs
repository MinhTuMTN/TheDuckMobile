using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class StoreDetailsResponse
    {
        public Entities.Store? Store { get; set; }
        public UserAddressResponse? Address { get; set; }
        public ICollection<Staff>? Staffs { get; set; }
        public ICollection<StoreProvinceResponse>? Provinces { get; set; }

        public StoreDetailsResponse(Entities.Store store,
            Entities.Address address,
            ICollection<Staff>? staffs,
            ICollection<Provine>? provinces)
        {
            Store = store;
            Address = new UserAddressResponse(address);
            Staffs = staffs;
            Provinces = provinces?.Select(p => new StoreProvinceResponse(p)).ToList();
        }
    }
}
