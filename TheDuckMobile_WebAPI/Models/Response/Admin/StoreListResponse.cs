using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class StoreListResponse
    {
        public Guid StoreId { get; set; }
        public string? StoreName { get; set; }
        public int OpenHours { get; set; }
        public int OpenMinutes { get; set; }
        public int CloseHours { get; set; }
        public int CloseMinutes { get; set; }
        public UserAddressResponse? Address { get; set; }
        public int NumberOfStaffs { get; set; }
        public int NumberOfOrders { get; set; }
        public bool IsDeleted { get; set; }

        public StoreListResponse(Entities.Store store)
        {
            StoreId = store.StoreId;
            StoreName = store.StoreName;
            OpenHours = store.OpenHours;
            OpenMinutes = store.OpenMinutes;
            CloseHours = store.CloseHours;
            CloseMinutes = store.CloseMinutes;
            Address = store.Address == null ? null : new UserAddressResponse(store.Address);
            NumberOfStaffs = store.Staffs == null ? 0 : store.Staffs.Count;
            NumberOfOrders = store.Orders == null ? 0 : store.Orders.Count;
            IsDeleted = store.IsDeleted;
        }
    }
}
