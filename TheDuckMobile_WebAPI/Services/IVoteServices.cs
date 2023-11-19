using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IVoteServices
    {
        public Task<ICollection<VoteUserResponse>> CreateVote(Guid customerId, Guid productId, CreateVoteRequest request);
        public Task<ICollection<VoteUserResponse>> GetAllVotesByProductId(Guid productId);
    }
}
