using Twilio;
using Twilio.Rest.Verify.V2.Service;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class TwilioServicesImpl : ITwilioServices
    {
        private readonly IConfiguration _configuration;
        public TwilioServicesImpl(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool SendSMSVerificationCode(string phoneNumber)
        {
            string? accountSid = _configuration["AppSettings:TwilioAccountSID"];
            string? authToken = _configuration["AppSettings:TwilioAuthToken"];

            TwilioClient.Init(accountSid, authToken);

            var verification = VerificationResource.Create(
                to: phoneNumber,
                channel: "sms",
                pathServiceSid: _configuration["AppSettings:TwilioVerifyServiceSID"]
            );
            return verification.Status == "pending";
        }

        public bool VerifySMSVerificationCode(string phoneNumber, string code)
        {
            string? accountSid = _configuration["AppSettings:TwilioAccountSID"];
            string? authToken = _configuration["AppSettings:TwilioAuthToken"];

            TwilioClient.Init(accountSid, authToken);

            var verificationCheck = VerificationCheckResource.Create(
                to: phoneNumber,
                code: code,
                pathServiceSid: _configuration["AppSettings:TwilioVerifyServiceSID"]
            );
            return verificationCheck.Status == "approved";
        }
    }
}
