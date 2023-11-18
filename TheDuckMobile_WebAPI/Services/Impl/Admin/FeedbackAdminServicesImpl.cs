using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class FeedbackAdminServicesImpl : IFeedbackAdminServices
    {
        private readonly DataContext _context;

        public FeedbackAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<FeedbackListResponse>> GetAllFeedbacks()
        {
            var feedbacks = await _context.Feedbacks.ToListAsync();
            return feedbacks.Select(f => new FeedbackListResponse(f)).ToList();
        }
    }
}
