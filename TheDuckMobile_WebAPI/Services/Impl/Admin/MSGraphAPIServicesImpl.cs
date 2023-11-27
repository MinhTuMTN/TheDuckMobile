using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Users.Item.AssignLicense;
using Microsoft.Graph.Users.Item.Authentication.Methods.Item.ResetPassword;
using Microsoft.Graph.Users.Item.SendMail;
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
                },
                UsageLocation = "VN",
            };
            var result = await graphClient.Users.PostAsync(user);

            if (result is null)
                throw new ExceptionWithStatusCode(500, "Cannot create new user");

            var userId = result.Id;

            var requestBody = new AssignLicensePostRequestBody
            {
                AddLicenses = new List<AssignedLicense>
                {
                    new AssignedLicense
                    {
                        DisabledPlans = new List<Guid?>(),
                        SkuId = Guid.Parse("c42b9cae-ea4f-4ab7-9717-81576235ccac"),
                    },
                },
                RemoveLicenses = new List<Guid?>(),
            };

            // To initialize your graphClient, see https://learn.microsoft.com/en-us/graph/sdks/create-client?from=snippets&tabs=csharp
            await graphClient.Users[userId].AssignLicense.PostAsync(requestBody);

            return userId;
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

        public async Task<bool> SendEmail(string receiver, string subject, string content)
        {
            var requestBody = new SendMailPostRequestBody
            {
                Message = new Message
                {
                    Subject = subject,
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Text,
                        Content = content,
                    },
                    ToRecipients = new List<Recipient>
                    {
                        new Recipient
                        {
                            EmailAddress = new EmailAddress
                            {
                                Address = receiver,
                            },
                        },
                    },
                }
            };

            var graphClient = createClient();

            try
            {
                await graphClient
                     .Users["c1b25c70-ef7f-4247-938d-8f6631cee8cf"]
                     .SendMail
                     .PostAsync(requestBody);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }

        public async Task<bool> Test()
        {
            throw new NotImplementedException();
        }
    }
}
