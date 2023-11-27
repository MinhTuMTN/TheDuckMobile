namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class CreateStaffRequest
    {
        public string? FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Email { get; set; }
    }
}
