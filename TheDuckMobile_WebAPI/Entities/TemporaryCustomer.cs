using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class TemporaryCustomer
    {
        public Guid TemporaryCustomerId { get; set; }
        public string? FullName { get; set; }
        public Gender Gender { get; set; }
        public string? Phone { get; set; }
        public string? OTP { get; set; }
        public int OTPRetry { get; set; }
        public DateTime? OTPExpiredAt { get; set; }

        public virtual Order? Order { get; set; }
    }
}
