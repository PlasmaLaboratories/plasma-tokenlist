#!/usr/bin/env node
// Validates that all token addresses are EIP-55 checksummed and unique per chainId.
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || 'plasma.tokenlist.json';
const data = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));

// Lazy load to avoid requiring if not used
const { toChecksumAddress } = require('web3-utils');

const seen = new Set();
let errors = 0;

if (!Array.isArray(data.tokens)) {
  console.error('Invalid list: tokens is not an array');
  process.exit(1);
}

for (const t of data.tokens) {
  const key = `${t.chainId}_${String(t.address).toLowerCase()}`;
  if (seen.has(key)) {
    console.error(`Duplicate token for chainId+address: ${key}`);
    errors++;
  }
  seen.add(key);

  try {
    const checksummed = toChecksumAddress(t.address);
    if (t.address !== checksummed) {
      console.error(`Bad checksum for ${t.address} (expected ${checksummed})`);
      errors++;
    }
  } catch (e) {
    console.error(`Invalid address (${t.address}): ${e.message}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nAddress validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('Address checksum & uniqueness OK');
}

