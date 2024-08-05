import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { eq } from 'drizzle-orm';
import { resources } from '../../lib/db/schema/resources';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { providerId } = req.body;

  try {
    const provider = await db.select()
      .from(resources)
      .where(eq(resources.id, providerId))
      .limit(1);

    if (provider.length === 0) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    // TODO: Implement actual verification logic
    // For now, we'll just assume all contact info is valid
    const isValid = true;

    res.status(200).json({ isValid });
  } catch (error) {
    console.error('Error verifying contact info:', error);
    res.status(500).json({ error: 'An error occurred while verifying contact information' });
  }
}