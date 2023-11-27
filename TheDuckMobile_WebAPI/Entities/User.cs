using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class User
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string? FullName { get; set; }

        public Gender Gender { get; set; }

        public string? Avatar { get; set; }

        [RegularExpression(@"^(\+84|0)\d{9}$")]
        public string? Phone { get; set; }


        public int Point { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModifiredAt { get; set; }

        public bool IsDeleted { get; set; }

        public string? OTP { get; set; }
        public DateTime? OTPExpiredAt { get; set; }
        public int OTPRetry { get; set; }

        // Relationship to Address
        private ICollection<Address>? _addresses;
        [JsonIgnore]
        public virtual ICollection<Address>? Addresses
        {
            get => _lazyLoader.Load(this, ref _addresses);
            set => _addresses = value;
        }

        public User()
        {
            Addresses = new HashSet<Address>();
            Point = 0;
        }

        public User(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
            Addresses = new HashSet<Address>();
            Point = 0;
        }
    }
}
