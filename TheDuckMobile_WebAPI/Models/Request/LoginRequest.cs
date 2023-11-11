namespace TheDuckMobile_WebAPI.Models.Request
{
    public class LoginRequest
    {
        public string? Phone { get; set; }
        public string? OTP { get; set; }
    }
}