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

            var products = os.Products;
            if (products != null)
            {
                foreach (var product in products)
                {
                    product.IsDeleted = true;
                    product.LastModifiedAt = DateTime.Now;
                }
            }

            await _context.SaveChangesAsync();

            return os.IsDeleted;
        }

        public async Task<OS?> RestoreOS(int osId)
        {
            var os = await GetOSById(osId);

            os.IsDeleted = false;
            os.LastModifiedAt = DateTime.Now;

            var products = os.Products;
            if (products != null)
            {
                foreach (var product in products)
                {
                    product.IsDeleted = false;
                    product.LastModifiedAt = DateTime.Now;
                }
            }

            await _context.SaveChangesAsync();

            return os;
        }

        public async Task<List<OS>> GetAllOSs(bool isDeletedFilter)
        {
            var oss = _context.OSs.AsQueryable();

            if (isDeletedFilter)
                oss = oss.Where(o => o.IsDeleted == false);

            var result = await oss.ToListAsync();

            return result;
        }

        public async Task<List<OS>> GetActiveOSs()
        {
            var oss = await _context
                .OSs
                .Where(o => o.IsDeleted == false)
                .ToListAsync();

            return oss;
        }

        public async Task<OS> GetOSById(int id)
        {
            var os = await _context
                .OSs
                .Include(o => o.Products)
                .FirstOrDefaultAsync(o => o.OSId == id);

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
