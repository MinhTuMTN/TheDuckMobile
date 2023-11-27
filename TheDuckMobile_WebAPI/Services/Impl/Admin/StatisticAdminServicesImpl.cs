using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;


namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class StatisticAdminServicesImpl : IStatisticAdminServices
    {
        private readonly DataContext _context;

        public StatisticAdminServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<StatisticResponse> Statistic(DateTime startDate, DateTime endDate)
        {
            var totalOrders = await _context.Orders.CountAsync();

            var totalDeliveredOrders = await _context
                .Orders
                .Where(o => o.OrderState == OrderState.Delivered)
                .CountAsync();

            var totalStaffs = await _context
                .Staffs
                .Where(s => s.IsDeleted == false)
                .CountAsync();

            var totalCustomer = await _context
                .Customers
                .Where(c => c.IsDeleted == false)
                .CountAsync();

            var totalProductVersions = await _context
                .ProductVersions
                .Where(pv => pv.IsDeleted == false)
                .CountAsync();

            var totalStores = await _context
                .Stores
                .Where(s => s.IsDeleted == false)
                .CountAsync();

            var topSoldProducts = await _context
                .Products
                .Include(p => p.Catalog)
                .Where(p => p.IsDeleted == false)
                .OrderByDescending(p => p.Sold)
                .Take(5)
                .ToListAsync();

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
                o.CreatedAt.Date >= startDate.Date &&
                o.CreatedAt.Date <= endDate.Date &&
                o.OrderState == OrderState.Delivered)
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
                totalCustomer,
                totalOrders,
                totalDeliveredOrders,
                totalProductVersions,
                totalStores,
                topSoldProducts,
                labelStatistic,
                dataStatistic,
                statisticOrders);
        }
    }
}
