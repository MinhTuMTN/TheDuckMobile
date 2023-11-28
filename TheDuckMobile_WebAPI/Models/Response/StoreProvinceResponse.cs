using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class StoreProvinceResponse
    {
        public int ProvinceId { get; set; }
        public string? ProvinceName { get; set; }

        public StoreProvinceResponse(Provine province)
        {
            ProvinceId = province.ProvinceId;
            ProvinceName = province.ProvineName;
        }
    }
}
