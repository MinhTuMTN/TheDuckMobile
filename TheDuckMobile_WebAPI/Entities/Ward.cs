using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Ward
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WardId { get; set; }
        public string? WardName { get; set; }

        //Tham chiếu tới bảng district
        public int DistrictId { get; set; }
        public virtual District? District { get; set; }

        //Chứa danh sách các address
        public virtual ICollection<Address>? Addresses { get; set; }

    }
}
