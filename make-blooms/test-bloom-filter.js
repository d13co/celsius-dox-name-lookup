import BloomFilters from 'bloom-filters';
import { readFileSync } from 'fs';

const { BloomFilter } = BloomFilters;

const filter = BloomFilter.fromJSON(JSON.parse(readFileSync(process.argv[2]).toString()));

const names = readFileSync(process.argv[3]).toString().split("\n").filter(Boolean);

let found = 0;
for (const name of names) {
  if (!filter.has(name)) {
    console.log("Expected but not found:", name);
  } else {
    found++;
  }
}

console.log(`Found ${found}/${names.length}`);
