using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class FirebaseServicesImpl : IFirebaseServices
    {

        public async Task<bool> SendNotification(string title, string body, string token, Dictionary<string, string> data)
        {

            var registrationToken = "foTiLstJQVGkrT5nEsNyOC:APA91bGz4Fw9RyVIdPqw79-qG_41yjWya5nSacDvwNock9N-j2rv9EZaW53NYGMf_7oecDjUqVP-mreqfhEQtVSWu2ogh3g_ezSLI5SSn6D28_DDkVQhdUgjNiM6YTnpJIHyUjhReKg6";

            var message = new FirebaseAdmin.Messaging.Message()
            {
                Notification = new FirebaseAdmin.Messaging.Notification
                {
                    Title = title,
                    Body = body,
                },
                Data = data,
                Token = registrationToken,
            };

            // Send a message to the device corresponding to the provided
            // registration token.
            var response = await FirebaseAdmin.Messaging.FirebaseMessaging.DefaultInstance.SendAsync(message);
            return true;
        }
    }
}
