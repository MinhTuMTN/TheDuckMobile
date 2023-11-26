using TheDuckMobile_WebAPI.Entities;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Customer : User
    {
        [JsonIgnore]
        public virtual ICollection<Vote>? Votes { get; set; }

        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get; set; }

        [JsonIgnore]
        public virtual ICollection<Coupon>? Coupons { get; set; }
    }
}
