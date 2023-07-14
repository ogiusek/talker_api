"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../db/index");
const index_2 = require("../utils/index");
const Login = (socket, data) => {
    const clientAddress = socket.uniqueAddress;
    if (typeof data !== 'object' || !('login' in data) || !('hash' in data))
        return (0, index_2.socketEmit)(socket, 'error', 400);
    index_1.db.all(`SELECT email, id FROM users 
  WHERE (username = ? OR email = ?) AND hash = ?;`, [data['login'], data['login'], data['hash']], (err, rows) => {
        if (rows.length !== 1)
            return (0, index_2.socketEmit)(socket, 'login', false);
        (0, index_2.socketEmit)(socket, 'login', { id: rows[0].id, handshake: clientAddress });
        index_1.dbCommands.setClientAddress(data['login'], clientAddress);
    });
};
function login() {
    (0, index_2.setEvent)('login', Login);
}
exports.default = login;
;
//# sourceMappingURL=login.js.map