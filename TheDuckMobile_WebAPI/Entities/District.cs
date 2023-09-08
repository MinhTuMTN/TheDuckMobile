using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class District
    {
        [Key]
        public Guid DistrictId { get; set; }
        [Required]
        public string DistrictName { get; set; }

        //Tham chieu toi bang provine qua ProvineId (1 district thuoc 1 provine)
        public byte ProvineId { get; set; }
        public virtual Provine Provine { get; set; }

        //Chứa danh sách các Address (1 district chứa nhiều Address)
        public virtual ICollection<Address> Addresses { get; set; }

        //1 district chứa nhiều Ward
        public virtual ICollection<Ward> Wards { get; set; }
    }
}
