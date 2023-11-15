using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IColorAdminServices
    {
        public Task<List<ColorListResponse>> GetAllColors();
    }
}
