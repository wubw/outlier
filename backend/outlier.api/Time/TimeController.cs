namespace outlier.api.Time
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using outlier.api.User;

    [Route("api/[controller]")]
    [Authorize]
    public class TimeController : Controller
    {
        private readonly Dal dal = new Dal();

        [HttpGet]
        public IEnumerable<TimeLog> Get()
        {
            var result = this.dal.GetTimeLogs(OutlierUser.CurrentId);
            return result;
        }

        [HttpGet("{id}")]
        public TimeLog Get(int id)
        {
            var result = this.dal.GetTimeLogs(OutlierUser.CurrentId);
            return result.ToList()[id];
        }

        [HttpPost]
        public async Task Post([FromBody]TimeLog value)
        {
            await this.dal.CreateTimeLogDocument(value);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("description")]
        public string Description()
        {
            return "Hours don't lie";
        }

        [HttpGet("category")]
        public async Task<IEnumerable<string>> Category()
        {
            var result = await this.dal.GetCategories(OutlierUser.CurrentId);
            return result.Categories;
        }

        [HttpPost("category")]
        public async Task Category([FromBody]string value)
        {
            await this.dal.AddCategory(OutlierUser.CurrentId, value);
        }

        [HttpDelete("category/{id}")]
        public async Task Category(int id)
        {
            await this.dal.DeleteCategory(OutlierUser.CurrentId, id);
        }

        [HttpGet("tag")]
        public async Task<IEnumerable<string>> Tag()
        {
            var result = await this.dal.GetTags(OutlierUser.CurrentId);
            return result.Tags;
        }

        [HttpPost("tag")]
        public async Task Tag([FromBody]string value)
        {
            await this.dal.AddTag(OutlierUser.CurrentId, value);
        }

        [HttpDelete("tag/{id}")]
        public async Task Tag(int id)
        {
            await this.dal.DeleteTag(OutlierUser.CurrentId, id);
        }
    }
}
