using System.Collections.Generic;

namespace CardsBench.API.Dtos
{
    public class BoardToReturnDto
    {
        public string BoardId { get; set; }
        public string BoardName { get; set; }
        public string OwnerId { get; set; }
        public string BoardBackground { get; set; }
        public ICollection<ListsForBoardDto> Lists { get; set; }
    }
}
