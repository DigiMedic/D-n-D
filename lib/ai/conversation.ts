import axios from 'axios';

export async function startConversation(): Promise<string> {
  const response = await axios.post('/api/ai', {
    action: 'startConversation'
  });
  return response.data.response;
}

export async function analyzeUserInput(userInput: string): Promise<{ intent: string; entities: Record<string, string> }> {
  const response = await axios.post('/api/ai', {
    action: 'analyzeUserInput',
    data: { userInput }
  });
  return response.data;
}

export async function generateResponse(context: { intent: string; entities: Record<string, string> }, augmentedContext: string): Promise<string> {
  const response = await axios.post('/api/ai', {
    action: 'generateResponse',
    data: { context, augmentedContext }
  });
  return response.data.response;
}

export async function checkAndCorrectCzech(text: string): Promise<string> {
  const response = await axios.post('/api/ai', {
    action: 'checkAndCorrectCzech',
    data: { text }
  });
  return response.data.correctedText;
}

export async function generateFollowUpQuestions(context: { intent: string; entities: Record<string, string> }): Promise<string[]> {
  const response = await axios.post('/api/ai', {
    action: 'generateFollowUpQuestions',
    data: { context }
  });
  return response.data.questions;
}

export async function augmentContext(originalQuery: string, relevantInfo: string): Promise<string> {
  const response = await axios.post('/api/ai', {
    action: 'augmentContext',
    data: { originalQuery, relevantInfo }
  });
  return response.data.augmentedContext;
}