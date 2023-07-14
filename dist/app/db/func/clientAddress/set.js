"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
const setClientAddress = (login, addr) => {
    db_1.default.run(`INSERT INTO users_addresses(user_id, clientAddress) 
  VALUES((SELECT id FROM users WHERE email = ? OR username = ?), ?);`, [login, login, addr], (err) => { });
};
exports.default = setClientAddress;
//# sourceMappingURL=set.js.map