using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using TheDuckMobile_WebAPI.Common;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Phone : ProductVersion
    {
        public int InternalMemory { get; set; }
        public string FrontCamera { get; set; }
        public string BackCamera { get; set; }
        public bool HeadphoneJack { get; set; }
        public string Bluetooth { get; set; }
        public string ChargingPort { get; set; }
        public bool GPS { get; set; }
        public bool Wifi { get; set; }
        public string NetworkTypesJson
        {
            get
            {
                return JsonSerializer.Serialize(NetworkTypes);
            }
            set
            {
                NetworkTypes = JsonSerializer.Deserialize<List<string>>(value); 
            }
        }
        [NotMapped]
        public List<string> NetworkTypes { get; set; } = new List<string>();
        public string Sim { get; set; }
        public SecurityFeature SecurityFeature { get; set; }
        public string WaterResistance { get; set; }
    }
}
