"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../db/index");
function email(app) {
    app.get('/isUsed/email', (req, res) => {
        const query = req.query;
        if (typeof query !== 'object' || !('email' in query))
            return res.sendStatus(400);
        index_1.db.all(`SELECT CASE WHEN
      (SELECT COUNT(*) FROM users WHERE email = ?) > 0 OR 
      (SELECT COUNT(*) FROM unconfirmed_users WHERE email = ?) > 0
        THEN 1
        ELSE 0
    END AS res;`, [query.email, query.email], (err, rows) => {
            if (!err)
                return res.json({ res: rows[0].res });
            res.sendStatus(400);
        });
    });
}
exports.default = email;
//# sourceMappingURL=email.js.map