using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IVoteServices _voteServices;

        public VoteController(IVoteServices voteServices)
        {
            _voteServices = voteServices;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllVotesByProductId([FromQuery] Guid productId)
        {
            var votes = await _voteServices.GetAllVotesByProductId(productId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = votes,
                Message = "Successfully retrieved votes"
            });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVote(
            [FromQuery] Guid productId,
            [FromBody] CreateVoteRequest request)
        {
            var customerId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var votes = await _voteServices.CreateVote(customerId, productId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = votes,
                Message = "Successfully created vote"
            });
        }

    }
}
