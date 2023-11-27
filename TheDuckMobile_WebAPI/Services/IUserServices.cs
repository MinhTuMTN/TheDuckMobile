using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IUserServices
    {
        public Task<User> CreateCustomer(RegisterRequest request);
        public Task<User?> FindUserByUserId(Guid userId);
        public Task<bool> CheckCustomerExists(string phoneNumber);
        public Task<bool> CheckStaffExists(string email);
        public Task<User?> FindUserByPhone(string phoneNumber);
        public Task<User?> FindUserByEmail(string email);
        public Task<User?> EditInformationUser(Guid userId, EditInformationUserRequest request);
        public Task<bool?> CheckAndSendOTP(string email);
        public Task<bool> StaffLogin(string email, string otp);
    }
}
