using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class District
    {
        private readonly ILazyLoader? _lazyLoader;
        [Key]
        public Guid DistrictId { get; set; }
        [Required]
        public string? DistrictName { get; set; }

        //Tham chieu toi bang provine qua ProvineId (1 district thuoc 1 provine)
        public byte ProvineId { get; set; }
        private Provine? _provine;
        public virtual Provine? Provine
        {
            get => _lazyLoader.Load(this, ref _provine);
            set => _provine = value;
        }

        //1 district chứa nhiều Ward
        private ICollection<Ward>? _wards;
        public virtual ICollection<Ward>? Wards
        {
            get => _lazyLoader.Load(this, ref _wards);
            set => _wards = value;
        }

        public District()
        {

        }

        public District(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
