using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

        public RegisterRequest()
        {
            this.Email = "";
            this.Password = "";
            this.FullName = "";
            this.Phone = "";
        }
    }
}
