namespace TheDuckMobile_WebAPI.ErrorHandler
{
    public class ExceptionWithStatusCode : Exception
    {
        public int StatusCode { get; set; }
        public ExceptionWithStatusCode(int statusCode, string? message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
