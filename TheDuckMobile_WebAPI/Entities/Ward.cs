using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Ward
    {
        private readonly ILazyLoader? _lazyLoader;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WardId { get; set; }
        public string? WardName { get; set; }

        //Tham chiếu tới bảng district
        [JsonIgnore]
        public int DistrictId { get; set; }
        private District? _district;
        [JsonIgnore]
        public virtual District? District
        {
            get => _lazyLoader.Load(this, ref _district);
            set => _district = value;
        }

        //Chứa danh sách các address
        [JsonIgnore]
        public virtual ICollection<Address>? Addresses { get; set; }

        public Ward()
        {

        }

        public Ward(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
