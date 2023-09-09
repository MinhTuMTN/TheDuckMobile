using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace TheDuckMobile_WebAPI.Config
{
    public class CloudinaryProvider
    {
        private readonly IConfiguration _configuraion;
        private readonly Cloudinary _cloudinary;

        public CloudinaryProvider(IConfiguration configuration)
        {
            _configuraion = configuration;
            _cloudinary = new Cloudinary(_configuraion["AppSettings:CloudinaryURL"]);
        }

        public String Upload(IFormFile file)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                UniqueFilename = true
            };

            var uploadResult = _cloudinary.Upload(uploadParams);

            if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Upload image to Cloudinary failed");

            return uploadResult.SecureUri.AbsoluteUri;
        }
    }
}
