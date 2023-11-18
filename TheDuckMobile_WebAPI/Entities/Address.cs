using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Address
    {
        private readonly ILazyLoader? _lazyLoader;
        [Key]
        public Guid AddressId { get; set; }

        [Required]
        public string? StreetName { get; set; }

        // Reference to Ward
        public int WardId { get; set; }
        private Ward? _ward;
        [JsonIgnore]
        public virtual Ward? Ward
        {
            get => _lazyLoader.Load(this, ref _ward);
            set => _ward = value;
        }

        // Relationship to Store
        public Guid? StoreId { get; set; }
        private Store? _store;
        [JsonIgnore]
        public virtual Store? Store
        {
            get => _lazyLoader.Load(this, ref _store);
            set => _store = value;
        }

        // Relationship to User
        public Guid? UserId { get; set; }
        private User? _user;
        [JsonIgnore]
        public virtual User? User
        {
            get => _lazyLoader.Load(this, ref _user);
            set => _user = value;
        }

        public Address()
        {

        }

        public Address(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }

    }
}
