using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class AddressServicesImpl : IAddressServices
    {
        private readonly DataContext _dataContext;
        public AddressServicesImpl(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ICollection<UserAddressResponse>?> AddUserAddress(Guid userId, UserAddAddressRequest request)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            if (user == null)
                return null;

            var ward = await _dataContext.Wards.FindAsync(request.WardId);
            if (ward == null)
                return null;

            var address = new Address
            {
                StreetName = request.Street,
                Ward = ward,
                Store = null
            };
            user.Addresses?.Add(address);
            await _dataContext.SaveChangesAsync();


            var addresses = await _dataContext.Addresss.Where(a => a.UserId == userId).ToListAsync();
            return addresses.Select(a => new UserAddressResponse(a)).ToList();
        }

        public async Task<ICollection<UserAddressResponse>?> AddUserAddressAnonymous(UserAddAddressRequest request)
        {
            var ward = await _dataContext.Wards.FindAsync(request.WardId);
            if (ward == null)
                return null;

            var address = new Address
            {
                StreetName = request.Street,
                Ward = ward,
                Store = null
            };
            await _dataContext.Addresss.AddAsync(address);
            await _dataContext.SaveChangesAsync();

            var addresses = await _dataContext
                .Addresss
                .Where(a => a.AddressId == address.AddressId)
                .ToListAsync();
            return addresses.Select(a => new UserAddressResponse(a)).ToList();
        }

        public async Task<ICollection<UserAddressResponse>?> DeleteUserAddress(Guid userId, Guid addressId)
        {
            var address = await _dataContext.Addresss.FindAsync(addressId);
            if (address == null)
                return null;

            _dataContext.Addresss.Remove(address);
            await _dataContext.SaveChangesAsync();

            var addresses = await _dataContext.Addresss.Where(a => a.UserId == userId).ToListAsync();
            return addresses.Select(a => new UserAddressResponse(a)).ToList();
        }

        public async Task<ICollection<UserAddressResponse>?> EditUserAddress(Guid userId, Guid addressId, UserAddAddressRequest request)
        {
            var address = await _dataContext.Addresss.FindAsync(addressId);
            if (address == null)
                return null;

            var ward = await _dataContext.Wards.FindAsync(request.WardId);
            if (ward == null)
                return null;

            address.StreetName = request.Street;
            address.Ward = ward;
            await _dataContext.SaveChangesAsync();

            var addresses = await _dataContext.Addresss.Where(a => a.UserId == userId).ToListAsync();
            return addresses.Select(a => new UserAddressResponse(a)).ToList();
        }

        public async Task<ICollection<District>> GetDistricts(int provineId)
        {
            var districts = await _dataContext
                .Districts
                .Where(d => d.ProvineId == provineId && d.IsDeleted == false)
                .OrderBy(d => d.DistrictName)
                .ToListAsync();
            return districts;
        }

        public async Task<ICollection<Provine>> GetProvines()
        {
            var provines = await _dataContext.Provines
                .Where(p => p.IsDeleted == false)
                .OrderBy(p => p.ProvineName)
                .ToListAsync();
            return provines;
        }

        public async Task<ICollection<UserAddressResponse>> GetUserAddresses(Guid userId)
        {
            var addresses = await _dataContext.Addresss.Where(a => a.UserId == userId).ToListAsync();
            return addresses.Select(a => new UserAddressResponse(a)).ToList();
        }

        public async Task<ICollection<Ward>> GetWards(int districtId)
        {
            var wards = await _dataContext
                .Wards
                .Where(w => w.DistrictId == districtId && w.IsDeleted == false)
                .ToListAsync();
            return wards;
        }
    }
}
