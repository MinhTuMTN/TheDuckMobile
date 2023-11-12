using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class AddressServicesImpl : IAddressServices
    {
        private readonly DataContext _dataContext;
        public AddressServicesImpl(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ICollection<District>> GetDistricts(int provineId)
        {
            var districts = await _dataContext.Districts.Where(d => d.ProvineId == provineId).ToListAsync();
            return districts;
        }

        public async Task<ICollection<Provine>> GetProvines()
        {
            var provines = await _dataContext.Provines.ToListAsync();
            return provines;
        }

        public async Task<ICollection<Ward>> GetWards(int districtId)
        {
            var wards = await _dataContext.Wards.Where(w => w.DistrictId == districtId).ToListAsync();
            return wards;
        }
    }
}
