import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { RunnableSequence } from 'langchain/schema/runnable';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { db } from '@/lib/db';
import { resources } from '@/lib/db/schema/resources';
import { like, or } from 'drizzle-orm';

export const runtime = 'edge';

const TEMPLATE = `Jste český AI asistent pro zdravotnictví. Vaším úkolem je poskytnout relevantní a přesné informace o poskytovatelích zdravotních služeb na základě dotazu uživatele.

Kontext: {context}

Lidský dotaz: {query}

AI asistent: Děkuji za Váš dotaz. Na základě poskytnutých informací Vám mohu nabídnout následující odpověď:`;

/**
 * This function retrieves relevant healthcare providers based on the user's query.
 */
async function retrieveProviders(query: string) {
  const providers = await db.select()
    .from(resources)
    .where(
      or(
        like(resources.NazevZarizeni, `%${query}%`),
        like(resources.OborPece, `%${query}%`),
        like(resources.Obec, `%${query}%`),
        like(resources.Kraj, `%${query}%`)
      )
    )
    .limit(5);

  return providers.map(provider => ({
    name: provider.NazevZarizeni,
    specialty: provider.OborPece,
    address: [provider.Ulice, provider.CisloDomovniOrientacni, provider.Obec, provider.Psc].filter(Boolean).join(', '),
    phone: provider.PoskytovatelTelefon,
    email: provider.PoskytovatelEmail,
    website: provider.PoskytovatelWeb
  }));
}

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.3,
});

const promptTemplate = PromptTemplate.fromTemplate(TEMPLATE);

const chain = RunnableSequence.from([
  {
    context: async (input: { query: string }) => {
      const providers = await retrieveProviders(input.query);
      return JSON.stringify(providers);
    },
    query: (input: { query: string }) => input.query,
  },
  promptTemplate,
  model,
  new StringOutputParser(),
]);

export default async function handler(req: NextRequest) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  const query = lastMessage.content;

  const stream = await chain.stream({
    query: query,
  });

  return new StreamingTextResponse(stream);
}