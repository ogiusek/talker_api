"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const index_1 = require("../../../utils/index");
const index_2 = require("../../utils/index");
const index_3 = __importDefault(require("../notify/index"));
const Type_wait = (socket, data) => {
    const clientAddress = socket.uniqueAddress;
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
        return (0, index_2.socketEmit)(socket, 'error', 400);
    (0, index_1.auth_user)(socket, data, () => {
        db_1.default.run(`DELETE FROM typing_wait WHERE user_address = ?;`, [clientAddress], () => {
            db_1.default.run(`INSERT INTO typing_wait(user, user_address, to_user) VALUES(?, ?, ?)`, [data['to_id'], clientAddress, data['user_id']], () => {
                (0, index_3.default)(data['to_id'], data['user_id']);
            });
        });
    });
};
function type_wait() {
    (0, index_2.setEvent)('type_wait', Type_wait);
}
exports.default = type_wait;
//# sourceMappingURL=index.js.map