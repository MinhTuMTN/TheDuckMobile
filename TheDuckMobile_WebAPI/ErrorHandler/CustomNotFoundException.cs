namespace TheDuckMobile_WebAPI.ErrorHandler
{
    public class CustomNotFoundException : Exception
    {
        public CustomNotFoundException(string? message) : base(message)
        {
        }
    }
}
