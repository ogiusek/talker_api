"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const utils_1 = require("../utils");
const index_1 = __importDefault(require("../notify/index"));
function on_stop_typing(data, identyfier) {
    return () => {
        utils_1.typing[identyfier] = undefined;
        db_1.default.run(`DELETE FROM typing WHERE user = ? AND to_user = ?;`, [data['user_id'], data['to_id']], () => {
            (0, index_1.default)(data['user_id'], data['to_id']);
        });
    };
}
exports.default = on_stop_typing;
//# sourceMappingURL=on_stop_typing.js.map