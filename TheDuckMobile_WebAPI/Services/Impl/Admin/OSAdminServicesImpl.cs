using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class OSAdminServicesImpl : IOSAdminServices
    {
        private readonly DataContext _context;

        public OSAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<OS> AddOS(OSRequest request)
        {
            var os = new OS
            {
                OSName = request.OSName,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now,
                IsDeleted = false
            };

            await _context.OSs.AddAsync(os);
            await _context.SaveChangesAsync();

            return os;
        }

        public async Task<bool> DeleteOS(int id)
        {
            var os = await GetOSById(id);

            os.IsDeleted = true;
            os.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return os.IsDeleted;
        }

        public async Task<OS?> RestoreColor(int osId)
        {
            var os = await GetOSById(osId);

            os.IsDeleted = false;
            os.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return os;
        }

        public async Task<ICollection<OS>> GetAllOS()
        {
            var oss = await _context.OSs.ToListAsync();

            return oss;
        }

        public async Task<OS> GetOSById(int id)
        {
            var os = await _context.OSs.FirstOrDefaultAsync(o => o.OSId == id);

            if (os == null)
                throw new CustomNotFoundException("Can't found OS");

            return os;
        }

        public async Task<OS> UpdateOS(int id, OSRequest request)
        {
            var os = await GetOSById(id);

            os.OSName = request.OSName;
            os.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return os;
        }
    }
}
