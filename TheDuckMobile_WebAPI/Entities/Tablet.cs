using TheDuckMobile_WebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Tablet : ProductVersion
    {
        public int InternalMemory { get; set; }

        public string? FrontCamera { get; set; }

        public string? BackCamera { get; set; }

        public string? NetworkType { get; set; }

        public bool Wifi { get; set; }

        public bool GPS { get; set; }

        public bool Bluetooth { get; set; }

        public string? ChargingPort { get; set; }

        public bool HeadphoneJack { get; set; }
    }
}
