using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Ward
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WardId { get; set; }
        public string? WardName { get; set; }

        //Tham chiếu tới bảng district
        [JsonIgnore]
        public int DistrictId { get; set; }
        [JsonIgnore]
        public virtual District? District { get; set; }

        //Chứa danh sách các address
        [JsonIgnore]
        public virtual ICollection<Address>? Addresses { get; set; }

    }
}
