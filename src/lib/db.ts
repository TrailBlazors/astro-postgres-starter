import postgres from 'postgres';

const connectionString = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_PUBLIC_URL or DATABASE_URL environment variable is required');
}

// Create PostgreSQL connection
export const sql = postgres(connectionString, {
  ssl: 'require',
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Initialize database tables
export async function initDatabase() {
  try {
    console.log('Starting database initialization...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        pub_date TIMESTAMP DEFAULT NOW(),
        hero_image TEXT,
        slug TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    console.log('Posts table created/verified');

    // Seed with example post if empty
    const result = await sql`SELECT COUNT(*)::int as count FROM posts`;
    const count = result[0].count;
    
    console.log(`Found ${count} posts in database`);
    
    if (count === 0) {
      console.log('Seeding initial post...');
      await sql`
        INSERT INTO posts (title, description, content, author, slug, hero_image)
        VALUES (
          'Welcome to Astro + PostgreSQL',
          'Your first blog post powered by PostgreSQL',
          'This is your first blog post! Edit or delete this post from your PostgreSQL database. You can also add new posts through the database or build an admin interface.',
          'Astro Learner',
          'welcome-to-astro-postgres',
          'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800'
        )
      `;
      console.log('Initial post seeded successfully');
    }
    
    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error; // Re-throw to see the full error
  }
}

// Auto-initialize on server start
console.log('Initializing database on startup...');
initDatabase()
  .then(() => console.log('Database ready!'))
  .catch(err => console.error('Failed to initialize database:', err));