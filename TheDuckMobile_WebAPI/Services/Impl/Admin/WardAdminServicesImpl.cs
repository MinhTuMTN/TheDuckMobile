using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class WardAdminServicesImpl : IWardAdminServices
    {
        private readonly DataContext _context;

        public WardAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<Ward> CreateWard(int districtId, string wardName)
        {
            var district = await _context.Districts.FindAsync(districtId);

            if (district == null)
                throw new CustomNotFoundException("District not found");

            var ward = new Ward
            {
                District = district,
                WardName = wardName
            };

            await _context.Wards.AddAsync(ward);
            await _context.SaveChangesAsync();

            return ward;
        }

        public async Task<Ward> DeleteWard(int wardId)
        {
            var ward = await _context.Wards.FindAsync(wardId);

            if (ward == null)
                throw new CustomNotFoundException("Ward not found");

            ward.IsDeleted = true;
            await _context.SaveChangesAsync();

            return ward;
        }

        public async Task<List<Ward>> GetAllWards()
        {
            var wards = await _context.Wards.ToListAsync();

            return wards;
        }

        public async Task<Ward> UpdateWard(int wardId, string wardName)
        {
            var ward = await _context.Wards.FindAsync(wardId);

            if (ward == null)
                throw new CustomNotFoundException("Ward not found");

            ward.WardName = wardName;
            await _context.SaveChangesAsync();
            return ward;
        }
    }
}
