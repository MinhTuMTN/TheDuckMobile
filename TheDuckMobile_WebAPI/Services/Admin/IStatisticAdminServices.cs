using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IStatisticAdminServices
    {
        public Task<StatisticResponse> Statistic(DateTime startDate, DateTime endDate);
    }
}
