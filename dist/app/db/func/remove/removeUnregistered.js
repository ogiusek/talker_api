"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
function removeUnregisteredAccounts() {
    db_1.default.run(`DELETE FROM unconfirmed_users WHERE init_date < ?;`, [
        new Date(Date.now() - 24 * 60 * 60 * 1000)
    ]);
}
exports.default = removeUnregisteredAccounts;
//# sourceMappingURL=removeUnregistered.js.map