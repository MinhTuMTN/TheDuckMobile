using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Phone : ProductVersion
    {
        [Range(minimum: 0, maximum: int.MaxValue)]
        public int InternalMemory { get; set; }

        public string? FrontCamera { get; set; }

        public string? BackCamera { get; set; }

        public bool HeadphoneJack { get; set; }

        public bool Buetooth { get; set; }

        public string? ChargingPort { get; set; }

        public bool GPS { get; set; }

        public bool Wifi { get; set; }

        public string? NetworkType { get; set; }

        public SecurityFeature SecurityFeature { get; set; }

        public string? WaterResistance { get; set; }
    }
}
