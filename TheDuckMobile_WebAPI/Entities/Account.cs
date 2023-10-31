using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Account
    {
        [Key]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }


        public Guid UserId { get; set; }
        [JsonIgnore]
        public virtual User? User { get; set; }
    }
}
