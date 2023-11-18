using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class CouponAdminServicesImpl : ICouponAdminServices
    {
        private readonly DataContext _context;

        public CouponAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<CouponListResponse>> GetAllCoupons()
        {
            var coupons = await _context.Coupons.ToListAsync();
            return coupons.Select(c => new CouponListResponse(c)).ToList();
        }
    }
}
