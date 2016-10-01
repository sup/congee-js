#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var sqlite3 = require('sqlite3').verbose();

// Parse argument vector
program
  .parse(process.argv);

// Get and validate keys array
var key_value = program.args;
// Raise exception if nothing provided
if (!key_value.length) {
    console.error("Key required to get associated value!");
    process.exit(1);
}
// Raise exception if no value provided
if (key_value.length == 1) {
    console.error("Value required to put a key value pair!");
    process.exit(1);
}
// Raise exception if more than one key value pair provided
if (key_value.length > 2) {
    console.error("Can't provide more than one key value pair at a time!");
    process.exit(1);
}

// Put logic
var db = new sqlite3.Database('congee.db');
var key = key_value[0]
var value = key_value[1]
db.serialize(function() {
  db.run("CREATE TABLE if not exists congee (key TEXT PRIMARY KEY, value TEXT)");

  // Run insert/update statement to insert or override k-v pair
  var insert_statement = "INSERT OR IGNORE INTO congee(key, value) \
                          VALUES ('" + key + "', '" + value + "'); \
                          UPDATE congee SETS value='" + value + "' \
                          WHERE key='" + key + "'";
  db.run(insert_statement);

  // Print confirmation message
  console.log("Key: " + chalk.blue(key) + " associated with value: " + chalk.green(value));

});
db.close();
