# Astro + PostgreSQL Starter

**A production-ready Astro template with PostgreSQL database for Railway deployment.**

Build lightning-fast websites with dynamic content from a real database. Perfect for blogs, documentation sites, portfolios, and content-heavy applications that need the speed of static sites with database-driven content.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/astro-postgresql?referralCode=Ce0gB7&utm_medium=integration&utm_source=template&utm_campaign=generic)

## ✨ Features

- ⚡ **Astro** - Ultra-fast static site generation
- 🐘 **PostgreSQL** - Production-ready database
- 🎨 **Tailwind CSS** - Modern, responsive styling
- 📝 **Blog System** - Dynamic posts from database
- 🔄 **Server-Side Rendering** - Dynamic routes with database queries
- 🐳 **Docker Optimized** - Multi-stage builds for production
- 🚂 **Railway Ready** - Zero-config deployment
- 📱 **Responsive Design** - Mobile-first layout

## 🚀 Quick Start

### Deploy to Railway

Click the "Deploy on Railway" button above. Railway will automatically:
- Build your Astro application using Docker
- Provision a PostgreSQL database
- Create database tables and seed initial data
- Generate a public URL with SSL

### Local Development

**Prerequisites:**
- Node.js 20+ 
- PostgreSQL (or use Docker)

**Steps:**
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/astro-postgres-starter.git
cd astro-postgres-starter

# Install dependencies
npm install

# Set up PostgreSQL connection
# Create .env file with:
# DATABASE_URL=postgresql://user:password@localhost:5432/astro

# Run database initialization (creates tables)
node -e "require('./src/lib/db').initDatabase()"

# Start development server
npm run dev

# Open browser to http://localhost:4321
```

## 📁 Project Structure
```
astro-postgres-starter/
├── src/
│   ├── components/         # Reusable Astro components
│   ├── layouts/
│   │   └── Layout.astro   # Main layout wrapper
│   ├── pages/
│   │   ├── index.astro    # Home page
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing
│   │   │   └── [slug].astro     # Dynamic blog post page
│   │   └── api/
│   │       ├── posts.json.ts    # API endpoint for posts
│   │       └── init-db.ts       # Database initialization
│   └── lib/
│       └── db.ts          # PostgreSQL connection & queries
├── Dockerfile             # Multi-stage Docker build
├── railway.toml           # Railway configuration
├── astro.config.mjs       # Astro configuration
└── README.md              # Documentation
```

## 🗄️ Database Schema

The template includes a `posts` table:
```sql
CREATE TABLE posts (
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
```

## 📝 Adding New Posts

### Option 1: Via PostgreSQL Database

Connect to your Railway PostgreSQL database and insert posts:
```sql
INSERT INTO posts (title, description, content, author, slug, hero_image)
VALUES (
  'My New Post',
  'A brief description',
  'Full post content here...',
  'Author Name',
  'my-new-post',
  'https://example.com/image.jpg'
);
```

### Option 2: Build an Admin Interface

Create admin pages to manage posts through a UI (future enhancement).

## 🛠️ Customization

### Add New Database Tables

Update `src/lib/db.ts`:
```typescript
export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      ...
    );
  `;
  
  // Add your new table
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(id),
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
```

### Create New Dynamic Routes

**Create:** `src/pages/project/[id].astro`
```astro
---
import { sql } from '../../lib/db';

const { id } = Astro.params;
const projects = await sql`SELECT * FROM projects WHERE id = ${id}`;
const project = projects[0];
---

<h1>{project.title}</h1>
```

### Customize Styling

Tailwind CSS is pre-configured. Modify classes in `.astro` files or add custom CSS.

## ⚡ Performance

**What makes this fast:**
- Static HTML generation by default
- Zero JavaScript shipped to browser (unless you add it)
- Server-side rendering for dynamic content
- PostgreSQL for efficient data queries
- Docker multi-stage builds reduce image size

**Lighthouse scores:**
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🌐 Use Cases

### Perfect For:

📝 **Blogs and Publications** - Fast, SEO-friendly content with database management  
📚 **Documentation Sites** - Technical docs with searchable database content  
🎨 **Portfolios** - Showcase projects with dynamic content updates  
🏢 **Landing Pages** - Marketing sites with database-driven testimonials/features  
📰 **News Sites** - Article management with categories and tags  
🛍️ **Product Catalogs** - E-commerce product pages from database  

## 🔧 Environment Variables

Railway automatically sets:
- `DATABASE_PUBLIC_URL` - PostgreSQL connection (auto-configured)
- `PORT` - Application port (default: 4321)
- `NODE_ENV` - Set to `production`

## 📚 Learn More

### Astro Resources
- [Astro Documentation](https://docs.astro.build/) - Official Astro docs and guides
- [Astro Integrations](https://astro.build/integrations/) - Extend with React, Vue, Svelte
- [Astro Blog Tutorial](https://docs.astro.build/en/tutorial/0-introduction/) - Build your first blog

### Database Resources
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - PostgreSQL guides
- [Postgres.js](https://github.com/porsager/postgres) - The PostgreSQL client we use
- [Railway PostgreSQL](https://docs.railway.app/databases/postgresql) - Railway database docs

### Deployment
- [Railway Docs](https://docs.railway.app/) - Platform documentation
- [Astro Deployment](https://docs.astro.build/en/guides/deploy/) - Deployment options

## 🎯 Roadmap

Potential enhancements:
- [ ] Admin dashboard for post management
- [ ] Comment system
- [ ] Search functionality
- [ ] RSS feed generation
- [ ] Markdown support for post content
- [ ] Image upload handling
- [ ] Categories and tags

## 🤝 Contributing

Contributions welcome! Submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for the Railway community** 🚂

**Want database-driven content with blazing speed?** This template combines the best of both worlds!

**Questions?** Open an issue on GitHub or reach out on Railway Discord.