namespace TheDuckMobile_WebAPI.Services
{
    public interface ITwilioServices
    {
        bool SendSMSVerificationCode(string phoneNumber);
        bool VerifySMSVerificationCode(string phoneNumber, string code);
    }
}
