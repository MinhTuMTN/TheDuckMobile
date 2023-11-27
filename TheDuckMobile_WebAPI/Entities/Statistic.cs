namespace TheDuckMobile_WebAPI.Entities
{
    public class Statistic
    {
        public DateTime OrderDate { get; set; }
        public double OrderTotal { get; set; }

        public Statistic ()
        {

        }

        public Statistic(DateTime OrderDate, double OrderTotal)
        {
            this.OrderDate = OrderDate;
            this.OrderTotal = OrderTotal;
        }
    }
}
