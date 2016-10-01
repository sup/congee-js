#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');

// Print program information
program
  .version('0.0.4')
  .command('list', 'List all available commands')
  .command('find [query]', 'Search saved commands by keyword')
  .command('get [key]', 'Get a command by a plaintext key')
  .command('put [key] [command]', 'Save a command mapped to a plaintext key')
  .command('remove [key]', 'Remove a command by a plaintext key')
  .command('clear', 'Delete all key value pairs stored')
  .parse(process.argv);
