namespace TheDuckMobile_WebAPI.Services.Store
{
    public interface IStaffServices
    {
        public Task<Entities.Store> GetStoreByStaffId(Guid staffId);
    }
}
