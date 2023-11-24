namespace TheDuckMobile_WebAPI.Services.Store
{
    public interface IStoreManagementServices
    {
        public Task<string?> GetStoreNameByStaffId(Guid staffId);
    }
}
