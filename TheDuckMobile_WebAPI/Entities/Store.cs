using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Store
    {
        [Key]
        public Guid StoreId { get; set; }
        public string? StoreName { get; set; }

        [Range(minimum: 0, maximum: 23)]
        public int OpenHours { get; set; }

        [Range(minimum: 0, maximum: 59)]
        public int OpenMinutes { get; set; }

        [Range(minimum: 0, maximum: 23)]
        public int CloseHours { get; set; }

        [Range(minimum: 0, maximum: 59)]
        public int CloseMinutes { get; set; }


        //Quan hệ 1 - 1 với bảng Address
        public virtual Address? Address { get; set; }

        //1 cửa hàng có nhiều nhân viên
        public virtual ICollection<Staff>? Staffs { get; set; }

        //1 cửa hàng có nhiều StoreProduct
        public virtual ICollection<StoreProduct>? StoreProducts { get; set; }

        //1 cửa hàng có nhiều order
        public virtual ICollection<Order>? Orders { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        public Store()
        {
            this.OpenHours = 8;
            this.OpenMinutes = 0;
            this.CloseHours = 21;
            this.CloseMinutes = 0;
        }
    }
}
