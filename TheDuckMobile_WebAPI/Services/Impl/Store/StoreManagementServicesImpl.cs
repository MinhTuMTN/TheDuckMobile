using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StoreManagementServicesImpl : Services.Store.IStoreManagementServices
    {
        private readonly DataContext _dataContext;

        public StoreManagementServicesImpl(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<string?> GetStoreNameByStaffId(Guid staffId)
        {
            var staff = await _dataContext
                .Staffs
                .Include(s => s.Store)
                .Where(s => s.UserId == staffId)
                .FirstOrDefaultAsync();

            return staff!.Store!.StoreName;
        }
    }
}
