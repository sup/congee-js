#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var sqlite3 = require('sqlite3').verbose();
var exec = require('child_process').exec;

// Parse argument vector
program
  .option('-r, --run', 'Get and run a retrieved command in shell (no output)')
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
  console.error("Can't provide more than one key at a time!");
  process.exit(1);
}

// Get logic
var db = new sqlite3.Database('congee.db');
db.serialize(function() {
  db.run("CREATE TABLE if not exists congee (key TEXT PRIMARY KEY, value TEXT)");

  // Create select statement to return stored values
  var select_statement = "SELECT rowid AS id, key, value \
                          FROM congee WHERE key='" + keys[0] + "'";

  // Handle value returned
  db.each(select_statement, function(err, row) {
    console.log(chalk.green(row.value));
    // If run option is specified, run the execute the returned value
    if (program.run) {
      exec(row.value, function(error, stdout, stderr) {
        // TODO: Callback and output

      });
    }
  });
});
db.close();
