namespace TheDuckMobile_WebAPI.Models.Request
{
    public class CreateVoteRequest
    {
        public double Rating { get; set; }
        public string? Comment { get; set; }
    }
}
