import { Database } from 'sqlite3';

const db = new Database('./db.db');
import initDb from "./func/init/init.db";

initDb(db);

export default db;