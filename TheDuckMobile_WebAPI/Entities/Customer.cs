using TheDuckMobile_WebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Customer : User
    {
        public virtual ICollection<Feedback> Feedbacks { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
