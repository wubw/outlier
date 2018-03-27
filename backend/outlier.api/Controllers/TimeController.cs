using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace outlier.api.Controllers
{
    [Route("api/[controller]")]
    public class TimeController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
            return "Hours don't lie";
        }

        [HttpGet("category")]
        public IEnumerable<string> Category()
        {
            return new[] { "Reading", "Programming", "Excercise", "Meeting" };
        }

        [HttpGet("tag")]
        public IEnumerable<string> Tag()
        {
            return new[] { "Machine Learning", "3D Graphics", "Security", "Software Architecture" };
        }
    }
}
