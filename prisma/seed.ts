// prisma/seed.js

import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const prisma = new PrismaClient();
// Error(42501) - https://zenn.dev/masa5714/articles/e675de708fb381

async function main() {
  const csvPath = path.join(__dirname, '../', 'supabase.csv');
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', async (row: any) => {
      await prisma.shelters.create({
        data: {
          id: uuidv4(),
          shelter_name: row.shelter_name,
          representative_name: row.representative_name,
          shelter_type: row.shelter_type,
          address: row.address,
          phone_number: row.phone_number,
          population_age_0_15: parseInt(row.population_age_0_15),
          population_age_16_59: parseInt(row.population_age_16_59),
          population_age_60_above: parseInt(row.population_age_60_above),
          male_population: parseInt(row.male_population),
          female_population: parseInt(row.female_population),
          supplies_not_needed: row.supplies_not_needed,
          supplies_needed: row.supplies_needed,
          remarks: row.remarks,
          photo_url: row.photo_url,
          is_emergency: row.is_emergency === 'true',
        },
      });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
