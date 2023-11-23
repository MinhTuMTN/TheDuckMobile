using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class CustomerOrderDetailsResponse
    {
        public string? CustomerName { get; set; }
        public UserAddressResponse? CustomerAddress { get; set; }

        public CustomerOrderDetailsResponse(Customer customer, Address address)
        {
            CustomerAddress = new UserAddressResponse(address);
            CustomerName = customer.FullName;
        }
    }
}
