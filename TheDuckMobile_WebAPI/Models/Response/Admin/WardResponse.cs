using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class WardResponse
    {
        public string? WardName { get; set; }
        public int DistrictId { get; set; }

        public WardResponse(Ward ward)
        {
            WardName = ward.WardName;
            DistrictId = ward.DistrictId;
        }
    }
}
