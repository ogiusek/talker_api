"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
function blocked_user(app) {
    app.get('/blocked/users', (req, res) => {
        const query = req.query;
        if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query))
            return res.sendStatus(400);
        db_1.default.all(`SELECT * FROM blocked_users WHERE by_user = (SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1);`, [query['clientAddress'], query['user_id']], (err, rows) => {
            res.json(rows);
        });
    });
}
exports.default = blocked_user;
//# sourceMappingURL=index.js.map