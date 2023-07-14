"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const index_1 = require("../../defineSocket/utils/index");
const clients_1 = __importDefault(require("../../defineSocket/utils/clients"));
function auth_user(socket, data, onLogin, onWrongData = () => { }) {
    const socketIsHandshake = typeof socket !== 'object';
    db_1.default.all(`SELECT user_id FROM users_addresses WHERE user_id = ? AND clientAddress = ?;`, [data['user_id'], socketIsHandshake ? socket : (socket.uniqueAddress)], (_, rows) => {
        try {
            if (rows.length === 1)
                return onLogin();
            const realSocket = socketIsHandshake ?
                clients_1.default[socket].socket :
                socket;
            (0, index_1.socketEmit)(realSocket, 'auth', false);
            onWrongData();
        }
        catch (err) { }
    });
}
exports.default = auth_user;
//# sourceMappingURL=auth_user.js.map