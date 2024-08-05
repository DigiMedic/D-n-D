import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, data } = req.body;

  try {
    switch (action) {
      case 'analyzeUserInput':
        const analysis = await analyzeUserInput(data.userInput);
        return res.status(200).json(analysis);
      case 'generateResponse':
        const response = await generateResponse(data.context, data.augmentedContext);
        return res.status(200).json({ response });
      case 'startConversation':
        const initialMessage = await startConversation();
        return res.status(200).json({ response: initialMessage });
      case 'checkAndCorrectCzech':
        const correctedText = await checkAndCorrectCzech(data.text);
        return res.status(200).json({ correctedText });
      case 'generateFollowUpQuestions':
        const questions = await generateFollowUpQuestions(data.context);
        return res.status(200).json({ questions });
      case 'augmentContext':
        const augmentedContext = await augmentContext(data.originalQuery, data.relevantInfo);
        return res.status(200).json({ augmentedContext });
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error in AI API:', error);
    return res.status(500).json({ error: 'An error occurred while processing the request', details: error.message });
  }
}

async function analyzeUserInput(userInput: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Jsi český asistent pro analýzu uživatelského vstupu. Tvým úkolem je určit záměr a entity z uživatelského vstupu. Odpověz ve formátu JSON." },
      { role: "user", content: userInput }
    ],
  });

  const result = completion.choices[0].message.content;
  return JSON.parse(result);
}

async function generateResponse(context: any, augmentedContext: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Jsi český asistent pro zdravotnictví. Poskytni relevantní a přesné informace na základě kontextu a dat o poskytovatelích." },
      { role: "user", content: JSON.stringify({ context, augmentedContext }) }
    ],
  });

  return completion.choices[0].message.content;
}

async function startConversation() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Jsi český asistent pro zdravotnictví. Začni konverzaci přívětivým pozdravem a nabídni pomoc." },
      { role: "user", content: "Začni konverzaci" }
    ],
  });

  return completion.choices[0].message.content;
}

async function checkAndCorrectCzech(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Jsi jazykový expert na češtinu. Tvým úkolem je zkontrolovat a opravit případné chyby v českém textu." },
      { role: "user", content: text }
    ],
  });

  return completion.choices[0].message.content;
}

async function generateFollowUpQuestions(context: any) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Jsi český asistent pro zdravotnictví. Vygeneruj několik relevantních doplňujících otázek na základě kontextu." },
      { role: "user", content: JSON.stringify(context) }
    ],
  });

  return completion.choices[0].message.content.split('\n');
}

async function augmentContext(originalQuery: string, relevantInfo: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Jsi český asistent pro zdravotnictví. Tvým úkolem je rozšířit kontext dotazu o relevantní informace." },
      { role: "user", content: `Původní dotaz: ${originalQuery}\nRelevantní informace: ${relevantInfo}` }
    ],
  });

  return completion.choices[0].message.content;
}