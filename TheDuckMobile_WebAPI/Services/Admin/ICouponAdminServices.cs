using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface ICouponAdminServices
    {
        public Task<List<CouponListResponse>> GetAllCoupons();
    }
}
