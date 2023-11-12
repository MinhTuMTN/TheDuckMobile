using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class UserServicesImpl : IUserServices
    {
        private readonly DataContext _context;

        public UserServicesImpl(DataContext context)
        {
            _context = context;
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
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
