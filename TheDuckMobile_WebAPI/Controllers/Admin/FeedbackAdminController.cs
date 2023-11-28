using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class FeedbackAdminController : ControllerBase
    {
        private readonly IFeedbackAdminServices _feedbackAdminServices;
        public FeedbackAdminController(IFeedbackAdminServices feedbackAdminServices)
        {
            _feedbackAdminServices = feedbackAdminServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOSs()
        {
            var feedbacks = await _feedbackAdminServices.GetAllFeedbacks();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = feedbacks,
                Message = "Successfully retrieved all feedbacks"
            });
        }
    }
}
