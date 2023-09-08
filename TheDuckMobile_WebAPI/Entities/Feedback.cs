using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Feedback
    {
        [Key]
        public Guid FeedbackId { get; set; }
        [Required]
        public string FeedbackPersonName { get; set; }
        [EmailAddress]
        public string? FeedbackPersonEmail { get; set; }
        [RegularExpression(@"^(\+84|0)\d{9}$")]
        public string FeedbackPersonPhone { get; set; }
        [Required]
        public string Content { get; set; } 
        public List<string> FeedbackImages { get; set; }
        public DateTime CreatedAt { get; set; }

        public Guid CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
