using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
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

        public Task<List<District>> GetAllDistricts(int provinceId)
        {
            var districts = _context.Districts.Where(d => d.ProvineId == provinceId).ToListAsync();
            return districts;
        }

        public async Task<List<ProvinceListResponse>> GetAllProvinces()
        {
            var provinces = await _context.Provines.ToListAsync();
            return provinces.Select(p => new ProvinceListResponse(p)).ToList();
        }

        public async Task<ProvinceResponse> AddProvince(AddProvinceRequest request)
        {
            var province = new Provine
            {
                ProvineName = request.ProvinceName,
                IsDeleted = false,
            };

            await _context.Provines.AddAsync(province);
            await _context.SaveChangesAsync();

            return new ProvinceResponse(province);
        }

        public async Task<Provine> UpdateProvince(int provinceId, AddProvinceRequest request)
        {
            var province = await _context.Provines
                .FirstOrDefaultAsync(p => p.ProvinceId == provinceId);

            if (province == null)
            {
                throw new CustomNotFoundException("Province can't be found");
            }
            province.ProvineName = request.ProvinceName;

            await _context.SaveChangesAsync();
            return province;
        }

        public async Task<DistrictResponse> AddDistrict(AddDistrictRequest request)
        {
            var district = new District
            {
                DistrictName = request.DistrictName,
                ProvineId = request.ProvinceId,
                IsDeleted = false,
            };

            await _context.Districts.AddAsync(district);
            await _context.SaveChangesAsync();

            return new DistrictResponse(district);
        }

        public async Task<District> UpdateDistrict(int districtId, AddDistrictRequest request)
        {
            var district = await _context.Districts
                .FirstOrDefaultAsync(d => d.DistrictId == districtId);

            if (district == null)
            {
                throw new CustomNotFoundException("District can't be found");
            }
            district.DistrictName = request.DistrictName;

            await _context.SaveChangesAsync();
            return district;
        }

        public async Task<WardResponse> AddWard(AddWardRequest request)
        {
            var ward = new Ward
            {
                WardName = request.WardName,
                DistrictId = request.DistrictId,
                IsDeleted = false,
            };

            await _context.Wards.AddAsync(ward);
            await _context.SaveChangesAsync();

            return new WardResponse(ward);
        }

        public async Task<Ward> UpdateWard(int wardId, AddWardRequest request)
        {
            var ward = await _context.Wards
                .FirstOrDefaultAsync(p => p.WardId == wardId);

            if (ward == null)
            {
                throw new CustomNotFoundException("Ward can't be found");
            }
            ward.WardName = request.WardName;

            await _context.SaveChangesAsync();
            return ward;
        }

        public async Task<List<Ward>> GetAllWards(int districtId)
        {
            var wards = await _context.Wards.Where(w => w.DistrictId == districtId).ToListAsync();
            return wards;
        }
    }
}

