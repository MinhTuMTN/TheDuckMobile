using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class OSListResponse
    {
        public int OSId { get; set; }
        public string? OSName { get; set; }
        public bool IsDeleted { get; set; }

        public OSListResponse(OS os)
        {
            OSId = os.OSId;
            OSName = os.OSName;
            IsDeleted = os.IsDeleted;
        }
    }
}
