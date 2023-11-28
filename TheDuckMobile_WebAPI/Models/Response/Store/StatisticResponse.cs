using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Store
{
    public class StatisticResponse
    {
        public int TotalOrders { get; set; }
        public int TotalStoreProducts { get; set; }
        public List<string> LabelStatistic { get; set; }
        public List<double> DataStatistic { get; set; }
        public List<Statistic> Statistics { get; set; }
        public List<PieChartStatistic> PieChartStatistics { get; set; }

        public StatisticResponse(
            int totalOrders,
            int totalStoreProducts,
            List<string> labelStatistic,
            List<double> dataStatistic,
            List<Statistic> statistics,
            List<PieChartStatistic> pieChartStatistics)
        {
            TotalOrders = totalOrders;
            TotalStoreProducts = totalStoreProducts;
            LabelStatistic = labelStatistic;
            DataStatistic = dataStatistic;
            Statistics = statistics;
            PieChartStatistics = pieChartStatistics;
        }
    }
}
