"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../db/index");
const auth_user_1 = __importDefault(require("../../utils/utilsCodes/auth_user"));
const messeagesLimit = 20;
function messeage(app) {
    app.get('/messeages', (req, res) => {
        const query = req.query;
        const from_messeage = !isNaN(Number(query['from_messeage'])) ? 'AND messeages.id <= ' + (query.from_messeage) : '';
        if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query) || !('with_id' in query))
            return res.sendStatus(400);
        (0, auth_user_1.default)(query.clientAddress, query, () => {
            index_1.db.all(`SELECT id, (SELECT value FROM FILES WHERE id = messeages.content_id) AS content, content_type, 
            from_user, to_user, 
            readen, notified, init_date
          FROM messeages 
          WHERE ((from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?)) ${from_messeage}
          ORDER BY init_date DESC, id DESC LIMIT ${messeagesLimit + 1};`, [query.user_id, query.with_id, query.with_id, query.user_id], (err, rows) => {
                if (err)
                    return res.sendStatus(400);
                res.json({
                    messeages: rows.length > messeagesLimit ? rows.slice(0, -1) : rows,
                    all: !(rows.length > messeagesLimit)
                });
            });
        }, () => {
            res.sendStatus(400);
        });
    });
}
exports.default = messeage;
//# sourceMappingURL=index.js.map