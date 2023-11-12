using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IAddressServices
    {
        public Task<ICollection<Provine>> GetProvines();
        public Task<ICollection<District>> GetDistricts(int provineId);
        public Task<ICollection<Ward>> GetWards(int districtId);
    }
}
