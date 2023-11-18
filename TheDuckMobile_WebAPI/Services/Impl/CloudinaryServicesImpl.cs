using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class CloudinaryServicesImpl : ICloudinaryServices
    {
        private readonly IConfiguration _configuraion;
        private readonly Cloudinary _cloudinary;

        public CloudinaryServicesImpl(IConfiguration configuration)
        {
            _configuraion = configuration;
            _cloudinary = new Cloudinary(_configuraion["AppSettings:CloudinaryURL"]);
        }

        public Task<string> UploadImage(IFormFile image)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(image.FileName, image.OpenReadStream()),
                UniqueFilename = true
            };

            var uploadResult = _cloudinary.Upload(uploadParams);

            if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Upload image to Cloudinary failed");

            return Task.FromResult(uploadResult.SecureUrl.AbsoluteUri);
        }
    }
}
