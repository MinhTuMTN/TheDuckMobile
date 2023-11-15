using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class SpecialFeatureAdminServicesImpl : ISpecialFeatureAdminServices
    {
        private readonly DataContext _context;

        public SpecialFeatureAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<SpecialFeatureListResponse>> GetAllSpecialFeatures()
        {
            var specialFeatures = await _context.SpecialFeatures.ToListAsync();
            return specialFeatures.Select(s => new SpecialFeatureListResponse(s)).ToList();
        }
    }
}
