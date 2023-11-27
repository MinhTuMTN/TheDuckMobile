namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IMSGraphAPIServices
    {
        public Task<string> CreateNewUser(string email, string fullName);
        public Task<string> ResetPassword(string userId);
        public Task<bool> SendEmail(string receiver, string subject, string content);
        public Task<bool> Test();
    }
}
