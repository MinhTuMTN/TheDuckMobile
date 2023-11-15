using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class ColorAdminServicesImpl : IColorAdminServices
    {
        private readonly DataContext _context;

        public ColorAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ColorListResponse>> GetAllColors()
        {
            var colors = await _context.Colors.ToListAsync();
            return colors.Select(c => new ColorListResponse(c)).ToList();
        }
    }
}
