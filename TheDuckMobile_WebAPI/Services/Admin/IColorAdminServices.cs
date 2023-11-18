using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IColorAdminServices
    {
        public Task<Color?> AddColor(ColorRequest request);
        public Task<Color?> EditColor(string colorId, ColorRequest request);
        public Task<bool> DeleteColor(string colorId);
        public Task<Color?> RestoreColor(string colorId);
        public Task<List<Color>> GetAllColors();
        public Task<Color> GetColorById(string colorId);
    }
}
