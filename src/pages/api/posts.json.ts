import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const posts = await sql`
      SELECT id, title, description, author, pub_date, hero_image, slug
      FROM posts
      ORDER BY pub_date DESC
    `;

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};