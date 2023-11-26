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
        public List<Product> TopSoldProducts { get; set; }
        public List<Statistic> Statistics { get; set; }

        public StatisticResponse(
            int totalStaffs,
            int totalCustomers,
            int totalOrders,
            int totalDeliveredOrders,
            int totalProductVersions,
            List<Product> topSoldProducts,
            List<Statistic> statistics)
        {
            TotalStaffs = totalStaffs;
            TotalCustomers = totalCustomers;
            TotalOrders = totalOrders;
            TotalDeliveredOrders = totalDeliveredOrders;
            TotalProductVersions = totalProductVersions;
            TopSoldProducts = topSoldProducts;
            Statistics = statistics;
        }
    }
}
