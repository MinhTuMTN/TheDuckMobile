using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

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
        public DateTime CreatedAt { get; set; }

        public string FeedbackImagesJson
        {
            get
            {
                return JsonSerializer.Serialize(FeedbackImages);
            }
            set
            {
                FeedbackImages = JsonSerializer.Deserialize<List<string>>(value);
            }
        }

        [NotMapped]
        public List<string> FeedbackImages { get; set; } = new List<string>();
    }
}
