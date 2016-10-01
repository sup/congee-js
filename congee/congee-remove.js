#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var sqlite3 = require('sqlite3').verbose();

program
  .parse(process.argv);

// Get and validate keys array
var keys = program.args;

// Raise exception if no keys provided
if (!keys.length) {
  console.error("Key required to get associated value!");
  process.exit(1);
}
// Raise exception if more than one key provided
if (keys.length > 1) {
  console.error("Can't delete more than one key value pair at a time!");
  process.exit(1);
}

// List logic
var db = new sqlite3.Database('congee.db');
db.serialize(function() {
  db.run("CREATE TABLE if not exists congee (key TEXT PRIMARY KEY, value TEXT)");
  db.run("DELETE FROM congee WHERE key='" + keys[0] + "'");

  console.log(keys[0] + " removed from congee!");
});
db.close();
