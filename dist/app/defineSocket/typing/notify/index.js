"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const index_1 = require("../../utils/index");
function notify(user, to) {
    db_1.default.all(`SELECT user_address FROM typing_wait WHERE user = ? AND to_user = ?`, [user, to], (err, waitingRows) => {
        if (waitingRows.length === 0)
            return;
        waitingRows.map((e) => {
            const clientAddress = e.user_address;
            if (!index_1.clients[clientAddress])
                return;
            const socket = index_1.clients[clientAddress].socket;
            db_1.default.all(`SELECT user FROM typing WHERE user = ? AND to_user = ?;`, [user, to], (err, rows) => {
                (0, index_1.socketEmit)(socket, 'typing', {
                    typer: user,
                    typing: rows.length > 0,
                });
            });
        });
    });
}
exports.default = notify;
//# sourceMappingURL=index.js.map