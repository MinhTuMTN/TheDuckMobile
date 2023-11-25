using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class DistrictResponse
    {
        public string? DistrictName { get; set; }
        public int ProvinceId { get; set; }

        public DistrictResponse(District district)
        {
            DistrictName = district.DistrictName;
            ProvinceId = district.ProvineId;
        }
    }
}
