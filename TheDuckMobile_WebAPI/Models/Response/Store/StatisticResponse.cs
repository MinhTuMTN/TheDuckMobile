using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class StatisticResponse
    {
        public int TotalStaffs { get; set; }
        public int TotalOrders { get; set; }
        public int TotalDeliveredOrders { get; set; }
        public int TotalStoreProducts { get; set; }
        /*public List<StoreProduct> TopSoldStoreProducts { get; set; }*/
        public List<Statistic> Statistics { get; set; }

        public StatisticResponse(
            int totalStaffs,
            int totalOrders,
            int totalDeliveredOrders,
            int totalStoreProducts,
            /*List<StoreProduct> topSoldStoreProducts,*/
            List<Statistic> statistics)
        {
            TotalStaffs = totalStaffs;
            TotalOrders = totalOrders;
            TotalDeliveredOrders = totalDeliveredOrders;
            TotalStoreProducts = totalStoreProducts;
            /*TopSoldStoreProducts = topSoldStoreProducts;*/
            Statistics = statistics;
        }
    }
}
