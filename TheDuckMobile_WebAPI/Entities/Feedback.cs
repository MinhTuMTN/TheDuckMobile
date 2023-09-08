using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Feedback
    {
        [Key]
        public Guid FeebackId { get; set; }

        public Guid CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
