namespace outlier.api.Time
{
    using System;
    using Newtonsoft.Json;

    public class Category
    {
        [JsonProperty(PropertyName = "id")]
        public string UserId { get; set; }

        public string[] Categories { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class Tag
    {
        [JsonProperty(PropertyName = "id")]
        public string UserId { get; set; }

        public string[] Tags { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class TimeLog
    {
        public string UserId { get; set; }
        public DateTime StartTime { get; set; }
        public double HourSpent { get; set; }
        public string Category { get; set; }
        public string[] Tags { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
