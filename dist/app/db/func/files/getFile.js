"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
function getFile(id, callback) {
    db_1.default.all(`SELECT value FROM files WHERE id = ?;`, [id], (err, rows) => {
        if (rows.length > 0)
            return callback(rows[0]);
        callback(false);
    });
}
exports.default = getFile;
//# sourceMappingURL=getFile.js.map