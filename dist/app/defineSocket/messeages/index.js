"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const db_commands_1 = require("../../db/db.commands");
const auth_user_1 = __importDefault(require("../../utils/utilsCodes/auth_user"));
const index_1 = __importDefault(require("./notify/index"));
const index_2 = require("../utils/index");
const index_3 = __importDefault(require("./read/index"));
const Messeage = (socket, data) => {
    const content_type = !('content_type' in data) ? 'text' : data['content_type'];
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data) || !('content' in data))
        return (0, index_2.socketEmit)(socket, "error", 400);
    (0, auth_user_1.default)(socket, data, () => {
        (0, db_commands_1.getFileId)(data['content'], (file_id) => {
            db_1.default.run(`INSERT INTO messeages(content_id, content_type, from_user, to_user) VALUES(?, ?, ?, ?);`, [file_id, content_type, data['user_id'], data['to_id']], (err, _) => {
                if (err)
                    return (0, index_2.socketEmit)(socket, "error", 400);
                (0, index_1.default)(data['to_id']);
            });
        });
    });
};
function messeage() {
    (0, index_3.default)();
    (0, index_2.setEvent)('messeage', Messeage);
}
exports.default = messeage;
//# sourceMappingURL=index.js.map