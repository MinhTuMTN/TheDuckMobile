using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class DistrictAdminServicesImpl : IDistrictAdminServices
    {
        private readonly DataContext _context;

        public DistrictAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<District> CreateDistrict(int provinceId, string districtName)
        {
            var province = await _context.Provines.FindAsync(provinceId);

            if (province == null)
                throw new CustomNotFoundException("Province not found");

            var district = new District
            {
                DistrictName = districtName,
                Provine = province
            };
            await _context.Districts.AddAsync(district);
            await _context.SaveChangesAsync();

            return district;
        }

        public async Task<District> DeleteDistrict(int districtId)
        {
            var district = await _context.Districts.FindAsync(districtId);

            if (district == null)
                throw new CustomNotFoundException("District not found");

            district.IsDeleted = true;
            await _context.SaveChangesAsync();

            return district;
        }

        public async Task<List<District>> GetAllDistricts()
        {
            var districts = await _context.Districts.ToListAsync();
            return districts;
        }

        public async Task<District> UpdateDistrict(int districtId, string districtName)
        {
            var district = await _context.Districts.FindAsync(districtId);

            if (district == null)
                throw new CustomNotFoundException("District not found");

            district.DistrictName = districtName;
            await _context.SaveChangesAsync();

            return district;
        }
    }
}
