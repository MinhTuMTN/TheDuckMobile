using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Store;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StoreOrderServicesImpl : IStoreOrderServices
    {
        private readonly DataContext _dataContext;
        private readonly IStaffServices _staffServices;

        public StoreOrderServicesImpl(DataContext dataContext, IStaffServices staffServices)
        {
            _dataContext = dataContext;
            _staffServices = staffServices;
        }

        public async Task<PaginationResponse> GetStoreOrder(
            Guid staffId, int page, int limit, OrderState? orderState)
        {
            var store = await _staffServices.GetStoreByStaffId(staffId);

            if (store == null)
                throw new UnauthorizedException("Can't access to this resources");


            var orders = _dataContext.Orders
                .Where(o => o.StoreId == store.StoreId);

            if (orderState != null)
                orders = orders.Where(o => o.OrderState == orderState);

            var totalObjects = await orders.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalObjects / limit);

            var result = await orders
                .Skip(page * limit)
                .Take(limit)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new StoreOrderListResponse
                {
                    OrderId = o.OrderId,
                    OrderState = o.OrderState,
                    OrderDate = o.CreatedAt,
                    Total = o.Total
                })
                .ToListAsync();

            return new PaginationResponse
            {
                Limit = limit,
                Page = page,
                TotalObjects = totalObjects,
                TotalPages = totalPages,
                Objects = result
            };
        }
    }
}
