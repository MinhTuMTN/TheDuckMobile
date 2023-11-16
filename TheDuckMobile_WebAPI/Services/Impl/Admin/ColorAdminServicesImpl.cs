using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
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

        public async Task<Color?> AddColor(ColorRequest request)
        {
            var color = new Color
            {
                ColorName = request.ColorName,
                ColorId = Guid.NewGuid(),
                ColorCode = request.ColorCode!.StartsWith('#')
                    ? request.ColorCode
                    : '#' + request.ColorCode,
                IsDeleted = false,
                CreatedAt = DateTime.Now,
                LastModifiredAt = DateTime.Now
            };

            await _context.Colors.AddAsync(color);
            await _context.SaveChangesAsync();

            return color;
        }

        public async Task<bool> DeleteColor(string colorId)
        {
            var color = await GetColorById(colorId);

            color.IsDeleted = true;
            color.LastModifiredAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return color.IsDeleted;
        }

        public async Task<Color?> EditColor(string colorId, ColorRequest request)
        {
            if (!request.ColorCode!.StartsWith('#'))
                request.ColorCode = '#' + request.ColorCode;

            var color = await GetColorById(colorId);

            color.ColorName = request.ColorName;
            color.ColorCode = request.ColorCode;
            color.LastModifiredAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return color;
        }

        public async Task<List<Color>> GetAllColors()
        {
            var colors = await _context
                .Colors
                .Where(c => c.IsDeleted == false)
                .ToListAsync();

            return colors;
        }

        public async Task<Color> GetColorById(string colorId)
        {
            Guid guid = Guid.Parse(colorId);
            var color = await _context
                .Colors
                .FirstOrDefaultAsync(c => c.ColorId == guid && c.IsDeleted == false);

            if (color == null)
                throw new CustomNotFoundException("Can't found color");

            return color;
        }

        public async Task<Color?> RestoreColor(string colorId)
        {
            Guid guid = Guid.Parse(colorId);
            var color = await _context
                .Colors
                .FirstOrDefaultAsync(c => c.ColorId == guid && c.IsDeleted == true);

            if (color == null)
                throw new CustomNotFoundException("Can't found color");

            color.IsDeleted = false;
            color.LastModifiredAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return color;
        }
    }
}
