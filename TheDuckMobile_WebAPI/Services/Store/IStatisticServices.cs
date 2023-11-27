using TheDuckMobile_WebAPI.Models.Response.Store;

namespace TheDuckMobile_WebAPI.Services.Store
{
    public interface IStatisticServices
    {
        public Task<StatisticResponse> Statistic(DateTime startDate, DateTime endDate, Guid storeId);
    }
}
