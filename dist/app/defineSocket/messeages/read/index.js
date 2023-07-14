"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const index_1 = require("../../../utils/index");
const index_2 = require("../../utils/index");
const notify_1 = __importDefault(require("./notify"));
const MarkAsReaden = (socket, data) => {
    if (typeof data !== 'object' || !('user_id' in data) || !('messeage_id' in data))
        return (0, index_2.socketEmit)(socket, 'error', 400);
    (0, index_1.auth_user)(socket, data, () => {
        db_1.default.run(`UPDATE messeages SET readen = CURRENT_TIMESTAMP WHERE readen = NULL AND id <= ?  AND from_user = ?;`, [data['messeage_id'], data['user_id']], () => {
            (0, notify_1.default)(data);
        });
    });
};
function markAsReaden() {
    (0, index_2.setEvent)('read', MarkAsReaden);
}
exports.default = markAsReaden;
//# sourceMappingURL=index.js.map