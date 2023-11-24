using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class TemporaryCustomerRequest
    {
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public Gender Gender { get; set; }
    }
}
