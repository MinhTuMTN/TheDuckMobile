using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class CustomerOrderDetailsResponse
    {
        public string? CustomerName { get; set; }
        public string? PhoneNumber { get; set; }
        public UserAddressResponse? CustomerAddress { get; set; }

        public CustomerOrderDetailsResponse(Customer customer, Address address)
        {
            CustomerAddress = new UserAddressResponse(address);
            CustomerName = customer.FullName;
            PhoneNumber = customer.Phone;
        }

        public CustomerOrderDetailsResponse(TemporaryCustomer temporaryCustomer, Address address)
        {
            CustomerAddress = new UserAddressResponse(address);
            CustomerName = temporaryCustomer.FullName;
            PhoneNumber = temporaryCustomer.Phone;
        }
    }
}
