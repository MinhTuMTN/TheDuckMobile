using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Users.Item.Authentication.Methods.Item.ResetPassword;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class MSGraphAPIServicesImpl : IMSGraphAPIServices
    {
        private readonly IConfiguration _configuration;

        public MSGraphAPIServicesImpl(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> CreateNewUser(string email, string fullName)
        {
            var graphClient = createClient();

            var user = new User
            {
                AccountEnabled = true,
                DisplayName = fullName,
                MailNickname = email.Split("@")[0],
                UserPrincipalName = email,
                PasswordProfile = new PasswordProfile
                {
                    ForceChangePasswordNextSignIn = true,
                    ForceChangePasswordNextSignInWithMfa = false,
                    Password = "HCMUTE@2023"
                }
            };
            var result = await graphClient.Users.PostAsync(user);

            if (result is null)
                throw new ExceptionWithStatusCode(500, "Cannot create new user");

            return result.Id!;
        }

        public async Task<string> ResetPassword(string userId)
        {
            var graphClient = createClient();

            var newPassword = generatePassword();
            var requestBody = new User
            {
                PasswordProfile = new PasswordProfile
                {
                    ForceChangePasswordNextSignIn = true,
                    Password = newPassword,
                },
            };

            var result = await graphClient
                .Users[userId]
                .PatchAsync(requestBody);

            return newPassword;
        }

        private string generatePassword()
        {
            // Generate password 8 characters include least 1 uppercase, 1 lowercase, 1 number, 1 special character
            var password = "";
            var random = new Random();
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

            var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var lowerCase = "abcdefghijklmnopqrstuvwxyz";
            var number = "0123456789";
            var specialCharacter = "!@#$%^&*()_+";

            while (true)
            {
                for (int i = 0; i < 8; i++)
                {
                    password += characters[random.Next(characters.Length)];
                }

                if (password.Any(c => upperCase.Contains(c))
                    && password.Any(c => lowerCase.Contains(c))
                    && password.Any(c => number.Contains(c))
                    && password.Any(c => specialCharacter.Contains(c))
                )
                    break;
                else
                    password = "";
            }

            return password;
        }

        private GraphServiceClient createClient()
        {
            var scopes = new[] { "https://graph.microsoft.com/.default" };

            // Values from app registration in appseeting.json => AppSettings:MSGraph
            var clientId = _configuration["AppSettings:MSGraph:ClientId"];
            var tenantId = _configuration["AppSettings:MSGraph:TenantId"];
            var clientSecret = _configuration["AppSettings:MSGraph:ClientSecret"];

            // using Azure.Identity;
            var options = new ClientSecretCredentialOptions
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
            };

            // https://learn.microsoft.com/dotnet/api/azure.identity.clientsecretcredential
            var clientSecretCredential = new ClientSecretCredential(
                tenantId, clientId, clientSecret, options);

            var graphClient = new GraphServiceClient(clientSecretCredential, scopes);

            return graphClient;
        }
    }
}
