const sqlite3 = require('sqlite3').verbose();
const removeUnregisteredAccounts = require('./func/remove/removeUnregistered');
const db = new sqlite3.Database('./db/db.db');
const initDb = require('./func/init/init.db.js');

initDb(db);

setInterval(() => {
    removeUnregisteredAccounts();
}, 1000 * 60 * 60);

module.exports = db;