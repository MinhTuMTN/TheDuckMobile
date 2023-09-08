using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Vote
    {
        [Key]
        public Guid VoteId { get; set; }

        [Required]
        public int VoteRate { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<string> Images { get; set; }

        public Guid ProductId { get; set; }
        public virtual Product Product { get; set;}

        public Guid CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
