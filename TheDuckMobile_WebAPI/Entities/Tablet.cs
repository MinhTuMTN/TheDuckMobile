using ASPWebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Tablet : ProductVersion
    {
        public int InternalMemory { get; set; }

        public string FrontCamera { get; set; }

        public string BackCamera { get; set; }

        public string Sim { get; set; }

        public string NumberOfSim { get; set; }

        public string NetworkType { get; set; }

        public Boolean Wifi { get; set; }

        public Boolean GPS { get; set; }

        public Boolean Bluetooth { get; set; }

        public string ChargingPort { get; set; }

        public Boolean HeadphoneJack { get; set; }
    }
}
