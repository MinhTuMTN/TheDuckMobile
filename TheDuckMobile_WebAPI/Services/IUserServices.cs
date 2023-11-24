using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IUserServices
    {
        public Task<User> CreateCustomer(RegisterRequest request);
        public Task<User?> FindUserByUserId(Guid userId);
        public Task<bool> CheckCustomerExists(string phoneNumber);
        public Task<User?> FindUserByPhone(string phoneNumber);
        public Task<User?> EditInformationUser(Guid userId, EditInformationUserRequest request);
    }
}
