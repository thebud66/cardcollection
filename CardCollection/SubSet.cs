using System;
using System.ComponentModel.DataAnnotations;

namespace CardCollection
{
    public class SubSet
    {
        [Key]
        public int SubSetId { get; set; }
        public int SetId { get; set; }
        public string SubSetName { get; set; }
    }
}
