using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.ViewModels
{
    public class DateRangeModel
    {
        public string DateStart { get; set; }
        public string DateEnd { get; set; }

        private DateTime GetDateFromString(string strdate)
        {

            int strYear = Convert.ToInt32(strdate.Substring(0, 4));
            int strMonth = Convert.ToInt32(strdate.Substring(4, 2));
            int strDay = Convert.ToInt32(strdate.Substring(6, 2));
            return new DateTime(strYear, strMonth, strDay);
        }

        public DateTime GetDateStart()
        {
            return GetDateFromString(this.DateStart);
        }

        public DateTime GetDateEnd()
        {
            return GetDateFromString(this.DateEnd);
        }

    }
}
