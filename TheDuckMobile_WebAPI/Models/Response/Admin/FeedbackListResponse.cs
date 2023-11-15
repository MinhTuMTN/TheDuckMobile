using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class FeedbackListResponse
    {
        public Guid FeedbackId { get; set; }
        public string? FeedbackPersonName { get; set; }
        public string? FeedbackPersonEmail { get; set; }
        public string? FeedbackPersonPhone { get; set; }
        public DateTime CreatedAt { get; set; }

        public FeedbackListResponse(Feedback feedback)
        {
            FeedbackId = feedback.FeedbackId;
            FeedbackPersonName = feedback.FeedbackPersonName;
            FeedbackPersonEmail = feedback.FeedbackPersonEmail;
            FeedbackPersonPhone = feedback.FeedbackPersonPhone;
            CreatedAt = feedback.CreatedAt;
        }
    }
}
