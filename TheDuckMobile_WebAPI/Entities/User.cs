using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        public Gender Gender { get; set; }

        public string Avatar { get; set; }

        [RegularExpression(@"^(\+84|0)\d{9}$")]
        public string Phone { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public bool IsDeleted { get; set; }

        public virtual Account Account { get; set; }

        public User()
        {
            this.FullName = "";
            this.Phone = "";
            this.Avatar = "";
            this.Account = new Account();
        }
    }
}
