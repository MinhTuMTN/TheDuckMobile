using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ProvinceResponse
    {
        public string? ProvinceName { get; set; }

        public ProvinceResponse(Provine provine)
        {
            ProvinceName = provine.ProvineName;
        }
    }
}
