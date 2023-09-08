using ASPWebAPI.Entities;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Staff:User
    {
        //Quan hệ 1 - n với bảng store
        public Guid StoreId { get; set; }
        public virtual Store Store { get; set; }
    }
}
