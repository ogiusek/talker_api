"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
function confirm_register(app) {
    app.get('/register/confirm', (req, res) => {
        const query = req.query;
        if (typeof query !== 'object' || !('id' in query) || !('uuid' in query))
            return res.sendStatus(400);
        db_1.default.all(`SELECT email, username, hash FROM unconfirmed_users WHERE id = ? AND uuid = ?;`, [query['id'], query['uuid']], (err, rows) => {
            if (err)
                return res.sendStatus('error', 422);
            if (rows.length !== 1)
                return res.json({ res: 'Wrong or out dated link' });
            const user = rows[0];
            db_1.default.run(`INSERT INTO users(email, username, hash) VALUES(?, ?, ?, ?);`, [user.email, user.username, user.hash]);
            db_1.default.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [user.email]);
            res.json({ res: 'Success you can login' });
        });
    });
}
exports.default = confirm_register;
//# sourceMappingURL=confirm.register.js.map