"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const auth_user_1 = __importDefault(require("../../utils/utilsCodes/auth_user"));
const index_1 = require("../utils/index");
const Block = (socket, data) => {
    if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
        return (0, index_1.socketEmit)(socket, "error", 400);
    (0, auth_user_1.default)(socket, data, () => {
        db_1.default.run(`INSERT INTO blocked_users(by_user, blocked_user) 
    VALUES((SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1), ?);`, [socket.uniqueAddress, data['user_id'], data['blocked_id']], (err, _) => {
            if (err)
                (0, index_1.socketEmit)(socket, 'error', 422);
        });
    });
};
function block() {
    (0, index_1.setEvent)('block_user', Block);
}
exports.default = block;
//# sourceMappingURL=block.js.map