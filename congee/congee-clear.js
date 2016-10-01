#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var sqlite3 = require('sqlite3').verbose();

program
  .parse(process.argv);

// List logic
var db = new sqlite3.Database('congee.db');
db.serialize(function() {
  db.run("CREATE TABLE if not exists congee (key TEXT PRIMARY KEY, value TEXT)");
  db.run("DELETE FROM congee");

  console.log("All values removed from congee!");
});
db.close();
