#!/usr/bin/env node
const fs = require('fs');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const listFile = process.argv[2] || 'plasma.tokenlist.json';
const schemaFile = process.argv[3] || 'tokenlist.schema.json';
const list = JSON.parse(fs.readFileSync(listFile, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

if (validate(list)) {
  console.log(`${listFile} valid`);
} else {
  console.error(`${listFile} invalid`);
  for (const error of validate.errors) {
    console.error(`${error.instancePath || '/'} ${error.message}`);
  }
  process.exitCode = 1;
}
