"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
// const db = new Database('./app/db/db.db');
// const db = new Database('./dist/app/db/db.db');
const db = new sqlite3_1.Database('./db.db');
const init_db_1 = __importDefault(require("./func/init/init.db"));
(0, init_db_1.default)(db);
exports.default = db;
//# sourceMappingURL=db.js.map