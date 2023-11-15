using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProvinceListResponse
    {
        public int ProvinceId { get; set; }
        public string? ProvineName { get; set; }

        public ProvinceListResponse(Provine provine)
        {
            ProvinceId = provine.ProvinceId;
            ProvineName = provine.ProvineName;
        }
    }
}
