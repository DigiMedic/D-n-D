import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { eq, and, like, or } from 'drizzle-orm';
import { resources } from '../../lib/db/schema/resources';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { specialty, location } = req.body;

  try {
    let query = db.select()
      .from(resources)
      .where(eq(resources.type, 'healthcare_provider'));

    if (specialty) {
      query = query.where(like(resources.OborPece, `%${specialty}%`));
    }

    if (location) {
      query = query.where(
        or(
          like(resources.Obec, `%${location}%`),
          like(resources.Kraj, `%${location}%`),
          like(resources.Okres, `%${location}%`)
        )
      );
    }

    const providers = await query.limit(5);

    const recommendations = providers.map(provider => {
      return {
        name: provider.NazevZarizeni || 'Neznámý poskytovatel',
        specialty: provider.OborPece || 'Nespecifikováno',
        address: [
          provider.Ulice,
          provider.CisloDomovniOrientacni,
          provider.Obec,
          provider.Psc
        ].filter(Boolean).join(', '),
        phone: provider.PoskytovatelTelefon || 'Telefon není k dispozici',
        email: provider.PoskytovatelEmail || 'Email není k dispozici',
        website: provider.PoskytovatelWeb || 'Webová stránka není k dispozici'
      };
    });

    res.status(200).json({ recommendations: JSON.stringify(recommendations) });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'An error occurred while fetching recommendations', details: (error as Error).message });
  }
}