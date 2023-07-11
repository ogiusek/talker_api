import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./app/db/db.db');
import initDb from "./func/init/init.db.js";

initDb(db);

export default db;