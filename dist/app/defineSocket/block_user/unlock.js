"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const auth_user_1 = __importDefault(require("../../utils/utilsCodes/auth_user"));
const index_1 = require("../utils/index");
const Unlock = (socket, data) => {
    if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
        return (0, index_1.socketEmit)(socket, "error", 400);
    (0, auth_user_1.default)(socket, data, () => {
        db_1.default.run(`DELETE FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`, [data['user_id'], data['blocked_id']], (err, _) => {
            if (err)
                return (0, index_1.socketEmit)(socket, 'error', 422);
        });
    });
};
function unlock() {
    (0, index_1.setEvent)('unlock_user', Unlock);
}
exports.default = unlock;
//# sourceMappingURL=unlock.js.map