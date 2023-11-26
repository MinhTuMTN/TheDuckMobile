using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class StatisticResponse
    {
        public int TotalStaffs { get; set; }
        public int TotalCustomers { get; set;}
        public int TotalOrders { get; set; }
        public int TotalDeliveredOrders { get; set; }
        public int TotalProducts { get; set; }
        public List<Statistic> Statistics { get; set; }

        public StatisticResponse(
            int totalStaffs,
            int totalCustomers,
            int totalOrders,
            int totalDeliveredOrders,
            int totalProducts,
            List<Statistic> statistics)
        {
            TotalStaffs = totalStaffs;
            TotalCustomers = totalCustomers;
            TotalOrders = totalOrders;
            TotalDeliveredOrders = totalDeliveredOrders;
            TotalProducts = totalProducts;
            Statistics = statistics;
        }
    }
}
