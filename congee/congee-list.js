#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var sqlite3 = require('sqlite3').verbose();

program
  .option('-s, --sort [created|key|value]', 'Sort key value pairs by various attributes', /^(created|key|value)$/i)
  .parse(process.argv);

// List logic
var db = new sqlite3.Database('congee.db');
db.serialize(function() {
  db.run("CREATE TABLE if not exists congee (key TEXT PRIMARY KEY, value TEXT)");

  // Create select statement to return stored values
  var select_statement = "SELECT rowid AS id, key, value FROM congee ";
  if (program.sort == "created") {
      select_statement = select_statement + "ORDER BY id ASC";
  }
  else if (program.sort == "key") {
      select_statement = select_statement + "ORDER BY key ASC";
  }
  else if (program.sort == "value") {
      select_statement = select_statement + "ORDER BY value ASC";
  }
  // Display each key-value pair in congee
  db.each(select_statement, function(err, row) {
      console.log(chalk.blue(row.key) + ": " + chalk.green(row.value));
  });
});
db.close();
