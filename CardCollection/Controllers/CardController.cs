using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CardCollection.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CardController : ControllerBase
    {
        private CardCollectionDatabaseContext _context = new CardCollectionDatabaseContext();

        public CardController()
        {
            //_context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public List<Card> GetCards()
        {
            return _context.Cards.ToList();
        }

        [HttpGet]
        public async Task<List<Set>> GetSets()
        {
            List<Set> sets = await _context.Sets.OrderBy(s => s.SetName).ToListAsync();
            return sets;
        }

        [HttpGet]
        [Route("{setId}")]
        public async Task<List<SubSet>> GetSubSets(int setId)
        {
            List<SubSet> subSets = await _context.SubSets.Where(x => x.SetId == setId).OrderBy(ss => ss.SubSetName).ToListAsync();
            return subSets;
        }

        [HttpPut]
        [Route("{cardId}")]
        public async Task<List<Card>> IncrementQuantity(int cardId)
        {
            Card card = await _context.Cards.FindAsync(cardId);
            card.Quantity++;

            _context.Cards.Update(card);
            _context.SaveChanges();
            return await _context.Cards.ToListAsync();
        }

        [HttpPut]
        [Route("{cardId}")]
        public async Task<List<Card>> DecrementQuantity(int cardId)
        {
            Card card = await _context.Cards.FindAsync(cardId);
            if (card.Quantity == 0)
                return await _context.Cards.ToListAsync();
            else
                card.Quantity--;

            _context.Cards.Update(card);
            _context.SaveChanges();
            return await _context.Cards.ToListAsync();
        }

        [HttpPost]
        public async Task<List<Card>> AddCard(Card card)
        {
            Card newCard = new Card
            {
                Name = card.Name,
                Number = card.Number,
                Set = card.Set,
                SubSet = card.SubSet,
                Quantity = card.Quantity,
                Year = card.Year
            };

            Card existingCard = _context.Cards.Where(x => (x.Name == newCard.Name) && (x.Number == newCard.Number) && (x.Set == newCard.Set) && (x.SubSet == newCard.SubSet) && (x.Year == newCard.Year)).FirstOrDefault();

            if (existingCard == null)
            {
                _context.Cards.Add(newCard);
            } else
            {
                existingCard.Quantity++;
            }

            _context.SaveChanges();
            return await _context.Cards.ToListAsync();
        }

        [HttpPost]
        public async Task<List<Set>> AddSet(Set set)
        {
            Set newSet = new Set
            {
                SetName = set.SetName
            };

            _context.Sets.Add(newSet);
            _context.SaveChanges();
            return await _context.Sets.OrderBy(s => s.SetName).ToListAsync();
        }

        [HttpPost]
        public async Task<List<SubSet>> AddSubSet(SubSet subSet)
        {
            SubSet newSubSet = new SubSet
            {
                SetId = subSet.SetId,
                SubSetName = subSet.SubSetName
            };

            _context.SubSets.Add(newSubSet);
            _context.SaveChanges();
            return await _context.SubSets.Where(x => x.SetId == newSubSet.SetId).OrderBy(ss => ss.SubSetName).ToListAsync();
        }
    }
}
