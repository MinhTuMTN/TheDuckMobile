using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Provine
    {
        [Key]
        public byte ProvinceId { get; set; }
        [Required]
        public string ProvineName { get; set; }

        //Chứa danh sách các Address (1 province chứa nhiều Address)
        public virtual ICollection<Address> Addresses { get; set; }

        //Chứa danh sách các district (1 provine chứa nhiều district)
        public virtual ICollection<District> Districts { get; set; }


    }
}
