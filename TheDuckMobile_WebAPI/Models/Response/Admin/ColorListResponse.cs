using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class ColorListResponse
    {
        public Guid ColorId { get; set; }
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }
        public bool IsDeleted { get; set; }

        public ColorListResponse(Color color)
        {
            ColorId = color.ColorId;
            ColorName = color.ColorName;
            ColorCode = color.ColorCode;
            IsDeleted = color.IsDeleted;
        }
    }
}
