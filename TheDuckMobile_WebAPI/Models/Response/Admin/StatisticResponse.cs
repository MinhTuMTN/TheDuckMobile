using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class StatisticResponse
    {
        public int TotalStaffs { get; set; }
        public int TotalCustomers { get; set;}
        public int TotalOrders { get; set; }
        public int TotalDeliveredOrders { get; set; }
        public int TotalProductVersions { get; set; }
        public int TotalStores { get; set; }
        public List<Product> TopSoldProducts { get; set; }
        public List<string> LabelStatistic { get; set; }
        public List<double> DataStatistic { get; set; }
        public List<Statistic> Statistics { get; set; }

        public StatisticResponse(
            int totalStaffs,
            int totalCustomers,
            int totalOrders,
            int totalDeliveredOrders,
            int totalProductVersions,
            int totalStores,
            List<Product> topSoldProducts,
            List<string> labelStatistic,
            List<double> dataStatistic,
            List<Statistic> statistics)
        {
            TotalStaffs = totalStaffs;
            TotalCustomers = totalCustomers;
            TotalOrders = totalOrders;
            TotalDeliveredOrders = totalDeliveredOrders;
            TotalProductVersions = totalProductVersions;
            TotalStores = totalStores;
            TopSoldProducts = topSoldProducts;
            LabelStatistic = labelStatistic;
            DataStatistic = dataStatistic;
            Statistics = statistics;
        }
    }
}
