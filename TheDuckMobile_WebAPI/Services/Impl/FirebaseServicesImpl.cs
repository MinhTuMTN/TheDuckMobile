using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class FirebaseServicesImpl : IFirebaseServices
    {
        private readonly IConfiguration configuration;

        public FirebaseServicesImpl(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public async Task<bool> SendNotification(string title, string body, string token, Dictionary<string, string> data)
        {
            var registrationToken = configuration["AppSettings:FCMToken"];


            //var registrationToken = "fSTCK-VeRUig6WIrBGFWG3:APA91bH0aVY2aZ-fKV2vVBZLpHiLgxefNr9PQUMa_EWb26O-UxpaZg2bYW0yXdwgjOisVvp-e12R-7UqHBXcvIWFb9U1UYQUjuALrfSBo37HEdrQ2XYoarn52tcsVa5iJUOc771oO4EY";
            //var registrationToken = "foTiLstJQVGkrT5nEsNyOC:APA91bGt6DU8li1yRqKcMG0xB2ABRiM_h33i8DwVXuQ-uA18YscXuklWHKmX-eLkspRtr_i647UvMfOkKIPuWA4zCr3Jht23j3b2LgCV69hme63E2i-ga7Sjq-MUs-Tk9oizlaVA-j8O";

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
