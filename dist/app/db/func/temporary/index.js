"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
function removeTemporaryData(clientAddress) {
    db_1.default.run(`DELETE FROM typing WHERE user = (SELECT user_id FROM users_addresses WHERE clientAddress = ?);`, [clientAddress]);
    db_1.default.run(`DELETE FROM typing_wait WHERE user_address = ?;`, [clientAddress]);
}
exports.default = removeTemporaryData;
//# sourceMappingURL=index.js.map