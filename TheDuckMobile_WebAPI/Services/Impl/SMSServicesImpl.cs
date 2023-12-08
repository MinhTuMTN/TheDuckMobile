using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class SMSServicesImpl : ISMSServices
    {
        private readonly IFirebaseServices firebaseServices;
        private readonly IConfiguration configuration;
        private readonly DataContext context;

        public SMSServicesImpl(IFirebaseServices firebaseServices,
            DataContext dataContext,
            IConfiguration configuration
        )
        {
            this.firebaseServices = firebaseServices;
            context = dataContext;
            this.configuration = configuration;
        }

        public async Task<bool?> SendSMSVerificationCode(string phoneNumber)
        {
            // Create OTP with 6 digits
            var otp = new Random().Next(100000, 999999);

            var user = await context
                .Users
                .FirstOrDefaultAsync(
                    user => user.Phone == phoneNumber
                    && !user.IsDeleted
                );

            if (user == null)
            {
                var tempUser = await context
                    .TemporaryCustomers
                    .FirstOrDefaultAsync(
                        tempUser => tempUser.Phone == phoneNumber
                    );

                if (tempUser == null)
                {
                    tempUser = new TemporaryCustomer
                    {
                        FullName = "",
                        Gender = Common.Gender.Male,
                        Phone = phoneNumber,
                        OTP = otp.ToString(),
                        OTPRetry = 0,
                        OTPExpiredAt = DateTime.Now.AddMinutes(3),
                        TemporaryCustomerId = Guid.NewGuid(),
                    };

                    await context.TemporaryCustomers.AddAsync(tempUser);
                }
                else
                {
                    tempUser.OTP = otp.ToString();
                    tempUser.OTPRetry = 0;
                    tempUser.OTPExpiredAt = DateTime.Now.AddMinutes(3);
                }
            }
            else
            {
                // Check 3 minutes before aldready sent OTP
                if (user.OTPExpiredAt != null && user.OTPExpiredAt > DateTime.Now)
                    otp = int.Parse(user.OTP!);


                // Save to database
                user.OTP = otp.ToString();
                user.OTPRetry = 0;
                user.OTPExpiredAt = DateTime.Now.AddMinutes(10);
            }

            await context.SaveChangesAsync();

            var fcmToken = configuration["AppSettings:FCMToken"];
            if (fcmToken == null)
                return null;

            var sentSMS = await firebaseServices.SendNotification(
                "SMS Verification",
                "Your OTP is " + otp,
                fcmToken,
                new Dictionary<string, string>
                {
                    { "message", "Ma xac thuc cua ban la: " + otp.ToString() },
                    { "phoneNumber", phoneNumber },
                }
                );

            return sentSMS;
        }

        public async Task<bool> VerifySMSVerificationCode(string phoneNumber, string code)
        {
            int otpRetry = 0;
            string otp = "";
            DateTime expiredAt = DateTime.Now;
            var user = await context
                .Users
                .FirstOrDefaultAsync(
                    user => user.Phone == phoneNumber
                    && !user.IsDeleted
                );

            var tempUser = await context
                .TemporaryCustomers
                .FirstOrDefaultAsync(
                    tempUser => tempUser.Phone == phoneNumber
                );

            if (user == null)
            {
                if (tempUser == null)
                    return false;

                otpRetry = tempUser.OTPRetry;
                expiredAt = tempUser.OTPExpiredAt ?? DateTime.Now;
                if (tempUser.OTP is null)
                    return false;
                otp = tempUser.OTP;
            }
            else
            {
                otpRetry = user.OTPRetry;
                expiredAt = user.OTPExpiredAt ?? DateTime.Now;
                if (user.OTP is null)
                    return false;
                otp = user.OTP;
            }

            if (expiredAt < DateTime.Now)
                return false;

            if (otpRetry == 5)
                return false;

            if (otp != code)
            {
                if (user is null)
                {
                    tempUser!.OTPRetry++;
                    await context.SaveChangesAsync();
                }
                else
                {
                    user.OTPRetry++;
                    await context.SaveChangesAsync();
                }

                await context.SaveChangesAsync();
                return false;
            }

            if (user != null)
            {
                user.OTP = null;
                user.OTPRetry = 0;
                user.OTPExpiredAt = null;
            }

            await context.SaveChangesAsync();

            return true;
        }
    }
}
