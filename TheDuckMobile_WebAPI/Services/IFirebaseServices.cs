namespace TheDuckMobile_WebAPI.Services
{
    public interface IFirebaseServices
    {
        Task<bool> SendNotification(string title, string body, string token, Dictionary<string, string> data);
    }
}
