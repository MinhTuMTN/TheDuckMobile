using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Vote
    {
        [Key]
        public Guid VoteId { get; set; }

        [Required]
        public int VoteRate { get; set; }

        public string? Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public string[] Images { get; set; }

        public Guid ProductId { get; set; }
        public virtual Product? Product { get; set; }

        public Guid CustomerId { get; set; }
        public virtual Customer? Customer { get; set; }

        public Vote()
        {
            this.Images = new string[0];
        }
    }
}
