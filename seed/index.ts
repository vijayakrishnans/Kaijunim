import { readFileSync } from 'fs';

async function main() {
  console.log('Seed script placeholder. Connect to Postgres and insert sample data from apps/web/data/sampleData.ts.');
  const sample = readFileSync('./apps/web/data/sampleData.ts', 'utf8');
  console.log('Sample definitions loaded', sample.length);
}

main();
