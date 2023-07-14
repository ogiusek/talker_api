"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const index_1 = require("../../../utils/index");
const index_2 = require("../../utils/index");
const notify_notified_1 = __importDefault(require("./notify.notified"));
function notify(user) {
    db_1.default.all(`SELECT DISTINCT from_user, to_user, id, (SELECT value FROM files WHERE files.id = content_id) AS content, content_type, readen, notified, init_date FROM messeages
  WHERE to_user = ? AND notified = 0;`, [user], (err, rows) => {
        if (err)
            return;
        (0, index_1.for_address)(user, (address) => {
            rows.map((messeage) => {
                db_1.default.all(`SELECT by_user FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`, [user, messeage.from_user], (err, blockedRows) => {
                    if (err || blockedRows.length !== 0)
                        return;
                    db_1.default.run(`UPDATE messeages SET notified = 1 WHERE id <= ? AND from_user = ?;`, [messeage.id, messeage.from_user]);
                    (0, index_2.socketEmit)(index_2.clients[address].socket, "messeage", messeage);
                    (0, notify_notified_1.default)(messeage.id);
                });
            });
        });
    });
}
exports.default = notify;
//# sourceMappingURL=index.js.map