using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CardCollection
{
    public class CardCollectionDatabaseContext: DbContext
    {
        public DbSet<Card> Cards { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<SubSet> SubSets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
                    => options.UseSqlite("Data Source=cardCollection.db");
    }
}
