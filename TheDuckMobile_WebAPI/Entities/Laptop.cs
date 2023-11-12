using System.ComponentModel.DataAnnotations;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Laptop : ProductVersion
    {
        public string? TypeOfRAM { get; set; }

        public int BusRAM { get; set; }

        public int HardDrive { get; set; }

        public string? GraphicCard { get; set; }

        public string? WifiStandard { get; set; }
    }
}
