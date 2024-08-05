import axios from 'axios';

export async function getRecommendations(entities: Record<string, string>): Promise<string> {
  try {
    const response = await axios.post('/api/recommendations', entities);
    return response.data.recommendations;
  } catch (error) {
    console.error('Chyba při získávání doporučení:', error);
    return "Omlouvám se, ale v tuto chvíli nemohu získat doporučení. Zkuste to prosím později.";
  }
}

export async function verifyContactInfo(providerId: string): Promise<boolean> {
  try {
    const response = await axios.post('/api/verifyContact', { providerId });
    return response.data.isValid;
  } catch (error) {
    console.error('Chyba při ověřování kontaktních informací:', error);
    return false;
  }
}

export async function getMedicalInfo(query: string): Promise<string> {
  try {
    const response = await axios.post('/api/medicalInfo', { query });
    return response.data.info;
  } catch (error) {
    console.error('Chyba při získávání medicínských informací:', error);
    return "Omlouvám se, ale v tuto chvíli nemohu získat požadované medicínské informace.";
  }
}

export async function getSimilarQueries(query: string): Promise<string[]> {
  try {
    const response = await axios.post('/api/similarQueries', { query });
    return response.data.queries;
  } catch (error) {
    console.error('Chyba při hledání podobných dotazů:', error);
    return [];
  }
}