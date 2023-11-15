using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IFeedbackAdminServices
    {
        public Task<List<FeedbackListResponse>> GetAllFeedbacks();
    }
}
