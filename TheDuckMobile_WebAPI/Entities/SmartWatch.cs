using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class SmartWatch : ProductVersion
    {
        public int InternalMemory { get; set; }
        public string? WaterResistance { get; set; }
        public WatchFaceShape WatchFaceShape { get; set; }
        public bool Bluetooth { get; set; }
        public bool GPS { get; set; }
        public WireMaterial WireMaterial { get; set; }
    }
}
