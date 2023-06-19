const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./app/db/db.db');
const initDb = require('./func/init/init.db.js');

initDb(db);

module.exports = db;