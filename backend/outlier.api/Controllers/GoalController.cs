using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

namespace outlier.api.Controllers
{
    using Microsoft.Extensions.Configuration;

    [Route("api/[controller]")]
    public class GoalController : Controller
    {
        private IConfiguration configuration;

        public GoalController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return this.configuration["Frontend:Url"];
        }

        [HttpPost]
        public void Post([FromBody]string value)
        {
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
            return "Setting Goals";
        }
    }
}
