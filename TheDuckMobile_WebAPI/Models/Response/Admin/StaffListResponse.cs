using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class StaffListResponse
    {
        public Guid UserId { get; set; }
        public string? FullName { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? StoreName { get; set; }
        public int NumberOfOrder { get; set; }
        public bool IsDeleted { get; set; }

        public StaffListResponse(Staff staff)
        {
            UserId = staff.UserId;
            FullName = staff.FullName;
            Avatar = staff.Avatar;
            Phone = staff.Phone;
            Email = staff.Email;
            StoreName = staff.Store == null ? "" : staff.Store.StoreName;
            NumberOfOrder = staff.Orders == null ? 0 : staff.Orders.Count;
            IsDeleted = staff.IsDeleted;
        }
    }
}
