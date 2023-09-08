using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class SmartWatch
    {
        public int InternalMemory { get; set; }
        public string WaterResistance { get; set; }
        public string Bluetooth { get; set; }
        public bool GPS { get; set; }
        public WatchFaceShape WatchFaceShape { get; set; }
        public string WatchFaceSize { get; set; }
        public WireMaterial WireMaterial { get; set; }
    }
}
