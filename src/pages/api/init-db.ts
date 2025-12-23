import type { APIRoute } from 'astro';
import { initDatabase } from '../../lib/db';

export const GET: APIRoute = async () => {
  try {
    await initDatabase();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database initialized successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to initialize database' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};