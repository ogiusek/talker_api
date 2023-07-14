"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const auth_user_1 = __importDefault(require("../../utils/utilsCodes/auth_user"));
function contacts(app) {
    app.get('/contacts', (req, res) => {
        const query = req.query;
        if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query))
            return res.sendStatus(400);
        (0, auth_user_1.default)(query.clientAddress, query, () => {
            db_1.default.all(`SELECT DISTINCT (CASE WHEN m.from_user > m.to_user THEN
        m.from_user || ',' || m.to_user ELSE
        m.to_user || ',' || m.from_user END) AS bab,

          u.id, (SELECT value FROM files WHERE files.id = u.avatar_id) AS avatar, u.username, 
          m.content_type, (SELECT value FROM files WHERE files.id = m.content_id) AS content, m.from_user
        FROM messeages AS m 
        INNER JOIN users AS u ON m.from_user = u.id OR m.to_user = u.id 
        WHERE u.id != ? AND (m.from_user = ? OR m.to_user = ?) ORDER BY m.id DESC;`, [query.user_id, query.user_id, query.user_id], (err, rows) => {
                if (err)
                    return res.sendStatus(400);
                const dRows = Object.values(rows.reduce((acc, obj) => {
                    if (!acc[obj.bab]) {
                        acc[obj.bab] = Object.assign({}, obj);
                        delete acc[obj.bab].bab;
                    }
                    return acc;
                }, {}));
                res.json(dRows);
                res.end();
            });
        }, () => { res.sendStatus(400); });
    });
}
exports.default = contacts;
//# sourceMappingURL=index.js.map