#!/usr/bin/env node
// Optionally check that all HTTP(S) logoURIs are reachable (200).
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const file = process.argv[2] || 'plasma.tokenlist.json';
const data = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const mod = url.startsWith('https') ? https : http;
      const req = mod.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ url, ok: true, status: res.statusCode });
        } else if (res.statusCode === 405 || res.statusCode === 403) {
          // Some hosts disallow HEAD; try GET
          const req2 = mod.request(url, { method: 'GET', timeout: 10000 }, (res2) => {
            resolve({ url, ok: res2.statusCode >= 200 && res2.statusCode < 300, status: res2.statusCode });
          });
          req2.on('error', () => resolve({ url, ok: false, status: 0 }));
          req2.end();
        } else {
          resolve({ url, ok: false, status: res.statusCode });
        }
      });
      req.on('timeout', () => {
        req.destroy();
        resolve({ url, ok: false, status: 0 });
      });
      req.on('error', () => resolve({ url, ok: false, status: 0 }));
      req.end();
    } catch (_) {
      resolve({ url, ok: false, status: 0 });
    }
  });
}

(async function main() {
  const urls = [];
  for (const t of data.tokens || []) {
    const u = t.logoURI;
    if (typeof u === 'string' && (u.startsWith('http://') || u.startsWith('https://'))) {
      urls.push(u);
    }
  }
  if (urls.length === 0) {
    console.log('No HTTP(S) logoURIs to check.');
    return;
  }
  const results = await Promise.all(urls.map(checkUrl));
  const bad = results.filter(r => !r.ok);
  if (bad.length) {
    console.error('Unreachable logoURIs:');
    for (const b of bad) console.error(` - ${b.url} (status: ${b.status})`);
    process.exit(1);
  }
  console.log('All logoURIs reachable.');
})();

