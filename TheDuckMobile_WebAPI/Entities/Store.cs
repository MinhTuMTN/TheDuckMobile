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
        public virtual Address Address { get; set; }

        //1 cửa hàng có nhiều nhân viên
        public virtual ICollection<Staff> Staffs { get; set;}

        //1 cửa hàng có nhiều StoreProduct
        public virtual ICollection<StoreProduct> StoreProducts { get; set;}

        //1 cửa hàng có nhiều order
        public virtual ICollection<Order> Orders { get; set;}
    }
}
