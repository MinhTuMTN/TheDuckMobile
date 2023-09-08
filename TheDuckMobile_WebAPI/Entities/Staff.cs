using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Staff : User
    {
        public virtual ICollection<Order> Orders { get; set; }
    }
}
