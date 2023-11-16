using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class BrandAdminServicesImpl : IBrandAdminServices
    {
        private readonly DataContext _context;

        public BrandAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<BrandListResponse>> GetAllBrands()
        {
            var brands = await _context.Brands
                .Include(b => b.Products)
                .ToListAsync();
            return brands.Select(b => new BrandListResponse(b)).ToList();
        }
    }
}
