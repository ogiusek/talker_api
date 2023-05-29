const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.db');

db.run(`CREATE TABLE IF NOT EXISTS test(
    fVal VARCHAR(50),
    sVal VARCHAR(50));`);

// get
// db.all('SELECT * FROM test;', [], (err, rows) => {
//     console.log(rows);
// });

module.exports = {
    db: db
};