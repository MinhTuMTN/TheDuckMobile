using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IAddressServices
    {
        public Task<ICollection<Provine>> GetProvines();
        public Task<ICollection<District>> GetDistricts(int provineId);
        public Task<ICollection<Ward>> GetWards(int districtId);
        public Task<ICollection<UserAddressResponse>?> DeleteUserAddress(Guid userId, Guid addressId);
        public Task<ICollection<UserAddressResponse>> GetUserAddresses(Guid userId);
        public Task<ICollection<UserAddressResponse>?> AddUserAddress(Guid userId, UserAddAddressRequest request);
        public Task<ICollection<UserAddressResponse>?> EditUserAddress(Guid userId, Guid addressId, UserAddAddressRequest request);
    }
}
