"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
function for_address(user_id, callback) {
    db_1.default.all(`SELECT clientAddress FROM users_addresses WHERE user_id = ?;`, [user_id], (err, rows) => {
        if (err || rows.length === 0)
            return;
        rows.map((address) => {
            try {
                callback(address.clientAddress);
            }
            catch (err) { }
        });
    });
}
exports.default = for_address;
//# sourceMappingURL=for_address.js.map