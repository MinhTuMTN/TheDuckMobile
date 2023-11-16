using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class AddressAdminServicesImpl : IAddressAdminServices
    {
        private readonly DataContext _context;

        public AddressAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ProvinceListResponse>> GetAllProvinces()
        {
            var provinces = await _context.Provines.ToListAsync();
            return provinces.Select(p => new ProvinceListResponse(p)).ToList();
        }
    }
}
