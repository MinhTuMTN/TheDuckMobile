using System.ComponentModel.DataAnnotations;
using ASPWebAPI.Entities;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Laptop : ProductVersion
    {
        public string TypeOfRAM { get; set; }

        public int BusRAM { get; set; }

        public string MaximumRAM { get; set; }

        public int HardDrive { get; set; }

        public string GraphicCard { get; set; }

        public string Webcam { get; set; }

        public string WifiStandard { get; set; }
    }
}
