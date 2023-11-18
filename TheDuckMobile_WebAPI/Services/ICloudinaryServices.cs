namespace TheDuckMobile_WebAPI.Services
{
    public interface ICloudinaryServices
    {
        public Task<string> UploadImage(IFormFile image);
    }
}
