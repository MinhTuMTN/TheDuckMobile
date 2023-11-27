using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response.Store;
using TheDuckMobile_WebAPI.Services.Store;


namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StatisticServicesImpl : IStatisticServices
    {
        private readonly DataContext _context;

        public StatisticServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<StatisticResponse> Statistic(
            DateTime startDate,
            DateTime endDate,
            Guid storeId)
        {
            var totalOrders = await _context
                .Orders
                .Where(o => o.StoreId == storeId)
                .CountAsync();

            var totalDeliveredOrders = await _context
                .Orders
                .Where(o =>
                o.OrderState == OrderState.Delivered &&
                o.StoreId == storeId)
                .CountAsync();

            var totalStaffs = await _context
                .Staffs
                .Where(s => s.StoreId == storeId &&
                s.IsDeleted == false)
                .CountAsync();

            var totalStoreProducts = await _context
                .StoreProducts
                .Where(sp =>
                sp.IsDelete == false &&
                sp.StoreId == storeId)
                .CountAsync();

            /*var topSoldStoreProducts = await _context
                .StoreProducts
                .Where(sp =>
                sp.IsDelete == false &&
                sp.StoreId == storeId)
                .OrderByDescending(sp => sp.Sold)
                .Take(5)
                .ToListAsync();*/

            if (startDate == DateTime.MinValue)
            {
                startDate = DateTime.Now.AddDays(-30);
            }

            if (endDate == DateTime.MinValue)
            {
                endDate = DateTime.Now;
            }

            var statisticOrders = await _context
                .Orders
                .Where(o =>
                o.CreatedAt.Date >= startDate &&
                o.CreatedAt.Date <= endDate &&
                o.OrderState == OrderState.Delivered &&
                o.StoreId == storeId)
                .GroupBy(o => o.CreatedAt.Date)
                .Select(g => new Statistic
                {
                    OrderDate = g.Key,
                    OrderTotal = g.Sum(o => o.Total)
                })
                .ToListAsync();

            List<string> labelStatistic = new List<string>();
            List<double> dataStatistic = new List<double>();
            foreach (var statistic in statisticOrders)
            {
                labelStatistic.Add(statistic.OrderDate.ToString("dd/MM"));
                dataStatistic.Add(statistic.OrderTotal);
            }

            return new StatisticResponse(
                totalStaffs,
                totalOrders,
                totalDeliveredOrders,
                totalStoreProducts,
                /*topSoldStoreProducts,*/
                labelStatistic,
                dataStatistic,
                statisticOrders);
        }
    }
}
