using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Provine
    {
        private readonly ILazyLoader? _lazyLoader;
        [Key]
        public byte ProvinceId { get; set; }
        [Required]
        public string? ProvineName { get; set; }

        //Chứa danh sách các district (1 provine chứa nhiều district)
        private ICollection<District>? _districts;
        public virtual ICollection<District>? Districts
        {
            get => _lazyLoader.Load(this, ref _districts);
            set => _districts = value;
        }

        public Provine()
        {

        }

        public Provine(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
