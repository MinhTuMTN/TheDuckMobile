using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class StaffAdminServicesImpl : IStaffAdminServices
    {
        private readonly DataContext _context;
        private readonly IMSGraphAPIServices _mSGraphAPIServices;

        public StaffAdminServicesImpl(DataContext context, IMSGraphAPIServices mSGraphAPIServices)
        {
            _context = context;
            _mSGraphAPIServices = mSGraphAPIServices;

        }

        public async Task<StaffListResponse> CreateStaff(Guid storeId, CreateStaffRequest request)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(s => s.StoreId == storeId && s.IsDeleted == false);

            if (store is null)
                throw new CustomNotFoundException("Store not found");

            // Check reqest.Email must be @minhtunguyen.onmicrosoft.com domain
            if (!request.Email!.Contains("@minhtunguyen.onmicrosoft.com"))
                throw new BadHttpRequestException("Email must be @minhtunguyen.onmicrosoft.com domain");

            // Check DateOfBirth must be more than 18 years old
            if (request.DateOfBirth!.AddYears(18) > DateTime.Now)
                throw new BadHttpRequestException("Date of birth must be more than 18 years old");

            // Check if email already exists
            var staff = await _context.Staffs.FirstOrDefaultAsync(s =>
                s.Email == request.Email
                && s.IsDeleted == false
            );

            if (staff != null)
                throw new BadHttpRequestException("Email already exists");

            var msGraphUserId = await _mSGraphAPIServices.CreateNewUser(request.Email, request.FullName!);

            var newStaff = new Staff
            {
                UserId = Guid.NewGuid(),
                FullName = request.FullName,
                Avatar = null,
                Phone = null,
                Email = request.Email,
                DateOfBirth = request.DateOfBirth,
                StoreId = storeId,
                CreatedAt = DateTime.Now,
                IsDeleted = false,
                MSGraphUserId = msGraphUserId,
                LastModifiredAt = DateTime.Now,
                Gender = Common.Gender.Male,
                Point = 0,
                Store = store
            };

            await _context.Staffs.AddAsync(newStaff);
            await _context.SaveChangesAsync();

            return new StaffListResponse(newStaff);
        }

        public async Task<List<StaffListResponse>> GetAllStaffs()
        {
            var staffs = await _context.Staffs
                .Include(s => s.Orders)
                .Include(s => s.Store)
                .ToListAsync();
            return staffs.Select(s => new StaffListResponse(s)).ToList();
        }

        public async Task<string> ResetPassword(Guid storeId, Guid staffId)
        {
            var staff = await _context
                .Staffs
                .Include(s => s.Store)
                .Where(s => s.StoreId == storeId && s.UserId == staffId && s.IsDeleted == false)
                .FirstOrDefaultAsync();

            if (staff is null)
                throw new CustomNotFoundException("Staff not found");

            var newPassword = await _mSGraphAPIServices.ResetPassword(staff.MSGraphUserId!);

            if (newPassword is null)
            {
                throw new ExceptionWithStatusCode(500, "Cannot reset password");
            }
            else
            {
                staff.LastModifiredAt = DateTime.Now;
                await _context.SaveChangesAsync();
            }

            return newPassword;
        }
    }
}
