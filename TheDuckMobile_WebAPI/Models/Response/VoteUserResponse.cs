using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class VoteUserResponse
    {
        public float Rate { get; set; }
        public string? Comment { get; set; }
        public string? UserName { get; set; }

        public VoteUserResponse(Vote vote)
        {
            Rate = vote.VoteRate;
            Comment = vote.Content;
            UserName = vote.Customer?.FullName;
        }
    }
}
