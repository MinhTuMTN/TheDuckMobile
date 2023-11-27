namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IMSGraphAPIServices
    {
        public Task<string> CreateNewUser(string email, string fullName);
        public Task<string> ResetPassword(string userId);
    }
}
