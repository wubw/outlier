namespace outlier.api.Time
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    using Microsoft.Azure.Documents;
    using Microsoft.Azure.Documents.Client;

    public class Dal
    {
        private string endpointUri;
        private string primaryKey;
        private readonly DocumentClient docDbClient;

        const string DbName = "Outlier";
        const string CollCategory = "Categories";
        const string CollTag = "Tags";
        const string CollTimeLogs = "TimeLogs";
        
        public Dal(string endpointUri, string primaryKey)
        {
            this.endpointUri = endpointUri;
            this.primaryKey = primaryKey;
            this.docDbClient = new DocumentClient(new Uri(this.endpointUri), this.primaryKey);
            this.Initialize().Wait();
        }

        private async Task Initialize()
        {
            await this.docDbClient.CreateDatabaseIfNotExistsAsync(new Database { Id = DbName });

            await this.docDbClient.CreateDocumentCollectionIfNotExistsAsync(
                UriFactory.CreateDatabaseUri(DbName), 
                new DocumentCollection { Id = CollCategory });

            await this.docDbClient.CreateDocumentCollectionIfNotExistsAsync(
                UriFactory.CreateDatabaseUri(DbName),
                new DocumentCollection { Id = CollTag });

            var colltimelogs = new DocumentCollection { Id = CollTimeLogs };
            colltimelogs.PartitionKey.Paths.Add("/UserId");
            await this.docDbClient.CreateDocumentCollectionIfNotExistsAsync(
                UriFactory.CreateDatabaseUri(DbName), colltimelogs);
        }

        public async Task CreateCategoryDocumentIfNotExists(Category category)
        {
            try
            {
                await this.docDbClient.ReadDocumentAsync(
                    UriFactory.CreateDocumentUri(DbName, CollCategory, category.UserId));
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await this.docDbClient.CreateDocumentAsync(
                        UriFactory.CreateDocumentCollectionUri(DbName, CollCategory), category);
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task CreateTagDocumentIfNotExists(Tag tag)
        {
            try
            {
                await this.docDbClient.ReadDocumentAsync(
                    UriFactory.CreateDocumentUri(DbName, CollTag, tag.UserId));
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await this.docDbClient.CreateDocumentAsync(
                        UriFactory.CreateDocumentCollectionUri(DbName, CollTag), tag);
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task CreateTimeLogDocument(TimeLog timelog)
        {
            await this.docDbClient.CreateDocumentAsync(
                UriFactory.CreateDocumentCollectionUri(DbName, CollTimeLogs), 
                timelog);
        }

        public IEnumerable<TimeLog> GetTimeLogs()
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var timelogquery = this.docDbClient.CreateDocumentQuery<TimeLog>(
                UriFactory.CreateDocumentCollectionUri(DbName, CollTimeLogs),
                queryOptions);
            return timelogquery;
        }

        public IEnumerable<TimeLog> GetTimeLogs(string userId)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1, PartitionKey = new PartitionKey(userId) };
            var timelogquery = this.docDbClient.CreateDocumentQuery<TimeLog>(
                UriFactory.CreateDocumentCollectionUri(DbName, CollTimeLogs),
                queryOptions);
            return timelogquery;
        }

        public async Task<Category> GetCategories(string userId)
        {
            Document result = await this.docDbClient.ReadDocumentAsync(
                                  UriFactory.CreateDocumentUri(DbName, CollCategory, userId));
            var category = (Category)(dynamic)result;
            return category;
        }

        public async Task AddCategory(string userId, string newCategory)
        {
            Document result = await this.docDbClient.ReadDocumentAsync(
                                  UriFactory.CreateDocumentUri(DbName, CollCategory, userId));
            var category = (Category)(dynamic)result;
            var list = category.Categories.ToList();
            list.Add(newCategory);
            category.Categories = list.ToArray();

            await this.docDbClient.ReplaceDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollCategory, userId),
                category);
        }

        public async Task DeleteCategory(string userId, int id)
        {
            Document result = await this.docDbClient.ReadDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollCategory, userId));
            var category = (Category)(dynamic)result;
            var list = category.Categories.ToList();
            list.RemoveAt(id);
            category.Categories = list.ToArray();

            await this.docDbClient.ReplaceDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollCategory, userId),
                category);
        }

        public async Task<Tag> GetTags(string userId)
        {
            Document result = await this.docDbClient.ReadDocumentAsync(
                                  UriFactory.CreateDocumentUri(DbName, CollTag, userId));
            var tag = (Tag)(dynamic)result;
            return tag;
        }

        public async Task AddTag(string userId, string newTag)
        {
            Document result = await this.docDbClient.ReadDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollTag, userId));
            var tag = (Tag)(dynamic)result;
            var list = tag.Tags.ToList();
            list.Add(newTag);
            tag.Tags = list.ToArray();

            await this.docDbClient.ReplaceDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollTag, userId),
                tag);
        }

        public async Task DeleteTag(string userId, int id)
        {
            Document result = await this.docDbClient.ReadDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollTag, userId));
            var tag = (Tag)(dynamic)result;
            var list = tag.Tags.ToList();
            list.RemoveAt(id);
            tag.Tags = list.ToArray();

            await this.docDbClient.ReplaceDocumentAsync(
                UriFactory.CreateDocumentUri(DbName, CollTag, userId),
                tag);
        }

        public async Task DropDatabase()
        {
            await this.docDbClient.DeleteDatabaseAsync(UriFactory.CreateDatabaseUri(DbName));
        }
    }
}
