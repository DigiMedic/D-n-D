import axios from 'axios';
import { parse } from 'csv-parse';
import { db } from '../lib/db';
import { providers } from '../lib/db/schema/providers';
import { services } from '../lib/db/schema/services';
import { eq } from 'drizzle-orm';

const NRPZS_URL = 'https://opendata.mzcr.cz/data/nrpzs/narodni-registr-poskytovatelu-zdravotnich-sluzeb.csv';

async function fetchNRPZSData() {
  const response = await axios.get(NRPZS_URL);
  return response.data;
}

async function parseCSV(csvData: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    parse(csvData, { columns: true, delimiter: ',', trim: true }, (err, records) => {
      if (err) reject(err);
      else resolve(records);
    });
  });
}

async function importData(data: any[]) {
  for (const record of data) {
    const provider = {
      name: record.nazev_poskytovatele,
      type: record.forma_poskytovatele,
      address: `${record.ulice} ${record.cislo_domu_orientacni}`,
      city: record.obec,
      postalCode: record.psc,
      phone: record.telefon,
      email: record.email,
      website: record.web,
      specializations: [record.obor_pece],
    };

    const [existingProvider] = await db.select().from(providers).where(eq(providers.name, provider.name));

    if (existingProvider) {
      await db.update(providers).set(provider).where(eq(providers.id, existingProvider.id));
    } else {
      await db.insert(providers).values(provider);
    }

    // TODO: Import services data when available
  }
}

async function main() {
  try {
    console.log('Fetching NRPZS data...');
    const csvData = await fetchNRPZSData();
    console.log('Parsing CSV data...');
    const parsedData = await parseCSV(csvData);
    console.log('Importing data to database...');
    await importData(parsedData);
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error during import:', error);
  }
}

main();