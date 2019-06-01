namespace outlier.api.test
{
    using System;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    using outlier.api.Time;

    [TestClass]
    public class DalTest
    {
        private static Dal dal;

        [ClassInitialize]
        public static void ClassInit(TestContext context)
        {
            dal = new Dal("https://localhost:8081", "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==");
            //dal = new Dal("https://outliertime.documents.azure.com:443", "gKuzpRxx6jMAYAB9si6HttVivhBapaNP3eDMPqCxGpjOdiR0wLuBFRchQ5VpmGdBgEG9jkq1Apo0XKR5aoe6eA==");

            var category1 = new Category
                                {
                                    UserId = "wubw",
                                    Categories = new[] { "Reading", "Programming", "Excercise", "Meeting" }
                                };
            dal.CreateCategoryDocumentIfNotExists(category1).Wait();

            var category2 = new Category
                                {
                                    UserId = "test",
                                    Categories = new[] { "Painting", "Sleeping", "Drinking" }
                                };
            dal.CreateCategoryDocumentIfNotExists(category2).Wait();

            var tag1 = new Tag
                           {
                               UserId = "wubw",
                               Tags = new[] { "Machine Learning", "3D Graphics", "Security", "Software Architecture" }
                           };
            dal.CreateTagDocumentIfNotExists(tag1).Wait();

            var tag2 = new Tag { UserId = "test", Tags = new[] { "Wine", "Beer" } };
            dal.CreateTagDocumentIfNotExists(tag2).Wait();

            var timelog1 = new TimeLog { UserId = "wubw", StartTime = DateTime.Now, HourSpent = 0.5, Category = "Reading", Tags = new[] { "Software Architecture" } };
            dal.CreateTimeLogDocument(timelog1).Wait();

            var timelog2 = new TimeLog { UserId = "wubw", StartTime = DateTime.Now, HourSpent = 1, Category = "Programming", Tags = new[] { "Security" } };
            dal.CreateTimeLogDocument(timelog2).Wait();

            var timelog3 = new TimeLog { UserId = "test", StartTime = DateTime.Now, HourSpent = 1, Category = "Drinking", Tags = new[] { "Beer", "Wine" } };
            dal.CreateTimeLogDocument(timelog3).Wait();

            var timelog4 = new TimeLog { UserId = "wubw", StartTime = DateTime.Now, HourSpent = 1, Category = "Meeting", Tags = new[] { "3D Graphics" } };
            dal.CreateTimeLogDocument(timelog4).Wait();

            var timelog5 = new TimeLog { UserId = "wubw", StartTime = DateTime.Now, HourSpent = 2, Category = "Excercise", Tags = new[] { "Machine Learning" } };
            dal.CreateTimeLogDocument(timelog5).Wait();
        }

        [TestMethod]
        public void CreateCategoryDocumentIfNotExists_Test()
        {

        }

        [TestMethod]
        public void Cleanup()
        {
            dal.DropDatabase().Wait();
        }
    }
}
