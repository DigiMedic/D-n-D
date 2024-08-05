import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Jsi zdravotnický asistent. Poskytni stručné a relevantní informace k dotazu pacienta." },
        { role: "user", content: query }
      ],
    });

    const medicalInfo = completion.choices[0].message.content;
    res.status(200).json({ info: medicalInfo });
  } catch (error) {
    console.error('Error fetching medical info:', error);
    res.status(500).json({ error: 'An error occurred while fetching medical information' });
  }
}