"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const for_address_1 = __importDefault(require("../../../utils/utilsCodes/for_address"));
const index_1 = require("../../utils/index");
function notify(data) {
    db_1.default.all(`SELECT from_user FROM messeages WHERE id = ?;`, [data['messeage_id']], (err, rows) => {
        (0, for_address_1.default)(rows[0].from_user, (address) => {
            (0, index_1.socketEmit)(index_1.clients[address].socket, 'read', { messeage_id: data['messeage_id'] });
        });
    });
}
exports.default = notify;
//# sourceMappingURL=notify.js.map