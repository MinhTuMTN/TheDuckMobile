using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Staff : User
    {
        public virtual ICollection<Order>? Orders { get; set; }

        //Quan hệ 1 - n với bảng store
        public Guid StoreId { get; set; }
        public virtual Store? Store { get; set; }
    }
}
