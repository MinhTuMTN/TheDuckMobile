namespace TheDuckMobile_WebAPI.ErrorHandler
{
    public class UnauthorizedException : Exception
    {
        public UnauthorizedException(string message) : base(message)
        {
        }
    }
}
