namespace TheDuckMobile_WebAPI.Models.Response
{
    public class PaginationResponse
    {
        public int Page { get; set; }
        public int Limit { get; set; }
        public int TotalPages { get; set; }
        public int TotalObjects { get; set; }
        public object? Objects { get; set; }
    }
}
