namespace TheDuckMobile_WebAPI.Services
{
    public interface ISMSServices
    {
        public Task<bool?> SendSMSVerificationCode(string phoneNumber);
        public Task<bool> VerifySMSVerificationCode(string phoneNumber, string code);
    }
}
