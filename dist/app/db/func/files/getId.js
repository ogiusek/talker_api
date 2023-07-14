"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
function getFileId(file, callback) {
    db_1.default.all(`SELECT id FROM files WHERE value = ?;`, [file], (err, rows) => {
        if (rows.length > 0)
            return callback(rows[0].id);
        db_1.default.all(`INSERT INTO files(value) VALUES(?);`, [file], (e) => {
            getFileId(file, callback);
        });
    });
}
exports.default = getFileId;
//# sourceMappingURL=getId.js.map