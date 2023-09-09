namespace TheDuckMobile_WebAPI.Models.Request
{
    // Model to upload personal information include name, age and avatar image
    public class TestModel
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public IFormFile Avatar { get; set; }
    }
}
