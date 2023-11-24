using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class ProvinceAdminServicesImpl : IProvinceAdminServices
    {
        private readonly DataContext _context;

        public ProvinceAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<Provine> CreateProvince(string provinceName)
        {
            var province = new Provine
            {
                ProvineName = provinceName
            };
            await _context.Provines.AddAsync(province);
            await _context.SaveChangesAsync();
            return province;
        }

        public async Task<Provine> DeleteProvince(int provinceId)
        {
            var province = await _context.Provines.FindAsync(provinceId);

            if (province == null)
                throw new CustomNotFoundException("Province not found");
            
            province.IsDeleted = true;
            await _context.SaveChangesAsync();
            return province;
        }

        public async Task<List<Provine>> GetAllProvinces()
        {
            var provinces = await _context.Provines.ToListAsync();

            return provinces;
        }

        public async Task<Provine> UpdateProvince(int provinceId, string provinceName)
        {
            var province = await _context.Provines.FindAsync(provinceId);

            if (province == null)
                throw new CustomNotFoundException("Province not found");

            province.ProvineName = provinceName;
            await _context.SaveChangesAsync();
            return province;
        }
    }
}
