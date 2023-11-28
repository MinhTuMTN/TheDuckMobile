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
        private readonly IStaffServices _staffServices;

        public StatisticServicesImpl(DataContext context, IStaffServices staffServices)
        {
            _context = context;
            _staffServices = staffServices;
        }

        public async Task<StatisticResponse> Statistic(
            DateTime startDate,
            DateTime endDate,
            Guid staffId)
        {
            var store = await _staffServices.GetStoreByStaffId(staffId);

            var totalOrders = await _context
                .Orders
                .Where(o => o.StoreId == store.StoreId)
                .CountAsync();

            var totalStoreProducts = await _context
                .StoreProducts
                .Where(sp =>
                sp.IsDelete == false &&
                sp.StoreId == store.StoreId)
                .CountAsync();

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
                o.StoreId == store.StoreId)
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

            var pieChartStatistics = await _context
                .Orders
                .Where(o => o.StoreId == store.StoreId)
                .GroupBy(o => o.OrderState)
                .Select(g => new PieChartStatistic
                {
                    Id = (int)g.Key,
                    Value = g.Count(),
                    Label = g.Key.ToString()
                })
                .ToListAsync();

            foreach (var pieChartStatistic in pieChartStatistics)
            {
                switch (pieChartStatistic.Id)
                {
                    case 0:
                        pieChartStatistic.Label = "Chờ xác nhận";
                        break;
                    case 1:
                        pieChartStatistic.Label = "Đang chuẩn bị";
                        break;
                    case 2:
                        pieChartStatistic.Label = "Đang giao";
                        break;
                    case 3:
                        pieChartStatistic.Label = "Đã hoàn thành";
                        break;
                    case 4:
                        pieChartStatistic.Label = "Bị huỷ";
                        break;
                    default:
                        break;
                }
            }

            return new StatisticResponse(
                totalOrders,
                totalStoreProducts,
                labelStatistic,
                dataStatistic,
                statisticOrders,
                pieChartStatistics);
        }
    }
}
