"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const index_1 = require("../../../utils/index");
const index_2 = require("../../utils/index");
function notify(messeage_id) {
    db_1.default.all(`SELECT from_user FROM messeages WHERE id = ?;`, [messeage_id], (err, rows) => {
        if (err || rows.length !== 1)
            return;
        (0, index_1.for_address)(rows[0].from_user, (address) => {
            (0, index_2.socketEmit)(index_2.clients[address].socket, 'notified', { messeage_id: messeage_id });
        });
    });
}
;
exports.default = notify;
//# sourceMappingURL=notify.notified.js.map