using System.Text.Json;

namespace TheDuckMobile_WebAPI.Models.Response
{
    public class GenericResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }
    }
}
