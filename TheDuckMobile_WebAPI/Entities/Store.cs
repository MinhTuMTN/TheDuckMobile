using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Store
    {
        [Key]
        public Guid StoreId { get; set; }
        public string StoreName { get; set; }
        public DateTime OpenHours { get; set; }
        public DateTime CreatAt { get; set; }
        public DateTime LastModifiedAt { get; set;}
        public bool IsDeleted { get; set; }

        //Quan hệ 1 - 1 với bảng Address
        public Guid AddressId { get; set; }
        public Address Address { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
