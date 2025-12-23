import postgres from 'postgres';

const connectionString = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_PUBLIC_URL or DATABASE_URL environment variable is required');
}

// Create PostgreSQL connection
export const sql = postgres(connectionString, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
});

// Initialize database tables
export async function initDatabase() {
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

  // Seed with example post if empty
  const posts = await sql`SELECT COUNT(*) FROM posts`;
  if (posts[0].count === '0') {
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
  }
}

// Auto-initialize database on server start
if (process.env.NODE_ENV === 'production') {
  initDatabase().catch(console.error);
}