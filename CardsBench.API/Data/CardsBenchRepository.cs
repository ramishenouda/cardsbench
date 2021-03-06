using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardsBench.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CardsBench.API.Data
{
    public class CardsBenchRepository : ICardsBenchRepository
    {
        private readonly DataContext _context;

        public CardsBenchRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<Board> GetBoard(string id)
        {
            return await _context.Boards.Include(l => l.Lists).ThenInclude(c => c.Cards).FirstOrDefaultAsync(x => x.BoardId == id);
        }

        public async Task<List<Board>> GetUserBoards(string userId)
        {
            var boardsId = _context.UserBorads.Where(x => x.UserId == userId).Select(x => x.BoardId);
            var boardsToReturn = await _context.Boards.Where(x => boardsId.Contains(x.BoardId)).ToListAsync();

            return boardsToReturn;
        }

        public async Task RemoveUserBoard(string userId)
        {
            var userBoards = await _context.Boards.Where(x => x.OwnerId == userId).ToListAsync();
            _context.RemoveRange(userBoards);
        }

        public async Task<bool> UserInBoard(string userId, string boardId)
        {
            var board = await _context.UserBorads.FirstOrDefaultAsync(x => x.UserId == userId && x.BoardId == boardId);
            
            if(board != null)
                return true;
            
            return false;
        }

        public async Task<List> GetList(string boardId, string listId)
        {
            return await _context.Lists.Include(x => x.Cards)
                .FirstOrDefaultAsync(x => x.BoardId == boardId && x.ListId == listId);
        }

        public async Task<Card> GetCard(string boardId, string listId, string cardId)
        {
            try {
                var board = await _context.Boards.Include(x => x.Lists).FirstOrDefaultAsync(x => x.BoardId == boardId);
                return board.Lists.FirstOrDefault(x => x.ListId == listId)
                    .Cards.FirstOrDefault(x => x.CardId == cardId);
            }catch(NullReferenceException){
                return null;
            }
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Remove<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
