using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ASPWebAPI.Entities
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public bool IsDeleted { get; set; }

        public virtual Account Account { get; set; }

        public User()
        {
            this.FullName = "";
            this.PhoneNumber = "";
        }
    }
}
