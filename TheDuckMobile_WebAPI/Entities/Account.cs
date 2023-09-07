using System.ComponentModel.DataAnnotations;

namespace ASPWebAPI.Entities
{

    public class Account
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }


        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
