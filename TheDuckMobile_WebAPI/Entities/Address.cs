using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Address
    {
        [Key]
        public Guid AddressId { get; set; }

        [Required]
        public string StreetName { get; set; }

        //Tham chieu toi bang provine thông qua ProvineId
        public byte ProvineId { get; set; }
        public Provine Provine { get; set; }

        //Tham chieu toi bang district thông qua DistrictId
        public Guid DistrictId { get; set; }
        public District District { get; set; }

        //Tham chiếu tới bảng Ward thông qua WardId
        public Guid WardId { get; set; }
        public Ward Ward { get; set; }


        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
