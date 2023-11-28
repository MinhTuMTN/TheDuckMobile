using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class UserServicesImpl : IUserServices
    {
        private readonly DataContext _context;
        private readonly IMSGraphAPIServices mSGraphAPIServices;

        public UserServicesImpl(DataContext context, IMSGraphAPIServices mSGraphAPIServices)
        {
            _context = context;
            this.mSGraphAPIServices = mSGraphAPIServices;
        }

        public async Task<bool> CheckCustomerExists(string phoneNumber)
        {
            var user = await _context.Customers.FirstOrDefaultAsync(user => user.Phone == phoneNumber && !user.IsDeleted);
            return user != null;
        }

        public async Task<User?> FindUserByPhone(string phoneNumber)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Phone == phoneNumber && !user.IsDeleted);
        }

        public async Task<User> CreateCustomer(RegisterRequest request)
        {
            var customer = new Customer
            {
                FullName = request.FullName,
                Phone = request.Phone,
                CreatedAt = DateTime.Now,
                LastModifiredAt = DateTime.Now,
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                Avatar = "https://i.imgur.com/1qkX7Gu.png"
            };

            await _context.Customers.AddAsync(customer);

            var tempCustomer = await _context.TemporaryCustomers.FirstOrDefaultAsync(tempCustomer => tempCustomer.Phone == request.Phone);
            if (tempCustomer != null)
            {
                _context.TemporaryCustomers.Remove(tempCustomer);
            }
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<User?> EditInformationUser(Guid userId, EditInformationUserRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserId == userId && !user.IsDeleted);

            if (user == null)
                return null;


            user.FullName = request.FullName;
            user.Gender = (Gender)request.Gender!;
            user.DateOfBirth = request.DateOfBirth;
            user.LastModifiredAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> FindUserByUserId(Guid userId)
        {
            var user = await _context
                .Users
                .FirstOrDefaultAsync(user => user.UserId == userId && !user.IsDeleted);

            return user;
        }

        public async Task<bool> CheckStaffExists(string email)
        {
            var staff = await _context
                .Staffs
                .FirstOrDefaultAsync(staff => staff.Email == email && !staff.IsDeleted);

            return staff != null;
        }

        public async Task<bool?> CheckAndSendOTP(string email)
        {
            var staff = await _context
                .Staffs
                .Where(staff => staff.Email == email && !staff.IsDeleted)
                .FirstOrDefaultAsync();

            if (staff is null)
                return false;

            // Check 3 minutes before aldready sent OTP
            if (staff.OTPExpiredAt != null && staff.OTPExpiredAt > DateTime.Now)
                return null;

            // Create OTP with 6 digits
            var otp = new Random().Next(100000, 999999);

            // Save to database
            staff.OTP = otp.ToString();
            staff.OTPRetry = 0;
            staff.OTPExpiredAt = DateTime.Now.AddMinutes(3);

            await _context.SaveChangesAsync();


            var sentEmail = await mSGraphAPIServices.SendEmail
                (email,
                "Xác thực đăng nhập",
                $"Mã OTP của bạn là {otp}. Vui lòng không chia sẻ mã này cho bất kỳ ai."
                );

            return sentEmail;
        }

        public async Task<bool> StaffLogin(string email, string otp)
        {
            var staff = await _context
                .Staffs
                .Where(staff => staff.Email == email && !staff.IsDeleted)
                .FirstOrDefaultAsync();

            if (staff is null)
                return false;

            if (staff.OTPExpiredAt < DateTime.Now)
                return false;

            if (staff.OTPRetry == 5)
                return false;

            if (staff.OTP != otp)
            {
                staff.OTPRetry++;
                await _context.SaveChangesAsync();
                return false;
            }

            staff.OTP = null;
            staff.OTPRetry = 0;
            staff.OTPExpiredAt = null;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<User?> FindUserByEmail(string email)
        {
            var staff = await _context
                .Staffs
                .Where(staff => staff.Email == email && !staff.IsDeleted)
                .FirstOrDefaultAsync();

            return staff;
        }
    }
}
