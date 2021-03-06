using System.Collections.Generic;

namespace CardsBench.API.Models
{
    public class List
    {
        public string ListId { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        public string BoardId { get; set; }
        public ICollection<Card> Cards { get; set; }
    }
}
