using System;
using System.ComponentModel.DataAnnotations;

namespace CardCollection
{
    public class Card
    {
        [Key]
        public int CardId { get; set; }

        public string Name { get; set; }

        public string Number { get; set; }

        public string Set { get; set; }

        public string SubSet { get; set; }

        public int Quantity { get; set; }

        public int Year { get; set; }

    }
}