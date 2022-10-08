import BloomFilters from 'bloom-filters';
import { readFileSync, writeFileSync } from 'fs';

const { BloomFilter } = BloomFilters;

const filename = 'names.bloom.json';

const names = readFileSync(process.argv[2]).toString().split("\n").map(w => w.trim()).filter(Boolean).map(w => w.trim())

const filter = BloomFilter.create(names.length, 0.005);

let i = 0;
for (const name of names) {
  filter.add(name)
  if (i++ % 10000 === 0)
    console.log('Did', i);
}

console.log('created', names.length);
console.log('writing to', filename);
writeFileSync(filename, JSON.stringify(filter.saveAsJSON()));
