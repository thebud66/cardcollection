using System;
using System.ComponentModel.DataAnnotations;

namespace CardCollection
{
    public class Set
    {
        [Key]
        public int SetId { get; set; }
        public string SetName { get; set; }
    }
}
