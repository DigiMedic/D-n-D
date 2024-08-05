import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { desc, sql } from 'drizzle-orm';
import { resources } from '../../lib/db/schema/resources';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  try {
    // TODO: Implement actual similarity search using pgvector
    // For now, we'll just return the latest 5 queries
    const similarQueries = await db.select({ content: resources.content })
      .from(resources)
      .where(sql`${resources.type} = 'query'`)
      .orderBy(desc(resources.createdAt))
      .limit(5);

    const queries = similarQueries.map(q => q.content || '').filter(Boolean);
    
    res.status(200).json({ queries });
  } catch (error) {
    console.error('Error fetching similar queries:', error);
    res.status(500).json({ error: 'An error occurred while fetching similar queries', details: (error as Error).message });
  }
}