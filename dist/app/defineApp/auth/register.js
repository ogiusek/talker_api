"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const index_1 = require("../../utils/index");
const db_1 = __importDefault(require("../../db/db"));
const registerMail_1 = __importDefault(require("./utils/registerMail"));
function register(app) {
    app.get('/register', (req, res) => {
        const query = req.query;
        if (typeof query !== 'object' || !('hash' in query) || !('email' in query) || !('username' in query))
            return res.sendStatus(400);
        db_1.default.all(`SELECT username, email FROM users WHERE username = ? OR email = ?;`, [query['username'], query['email']], (errUsers, rowsUsers) => {
            if (errUsers)
                return res.json({ res: "Server error or wrong query." });
            if (rowsUsers.length !== 0)
                return res.json({ res: rowsUsers.find((e) => e.username === query['username']) ? "Username exists" : "Email is used" });
            const uuid = (0, uuid_1.v4)();
            db_1.default.run(`INSERT INTO unconfirmed_users(uuid, email, username, hash) 
        VALUES(?, ?, ?, ?);`, [uuid, query['email'], query['username'], query['hash']], (errInsert) => {
                if (errInsert)
                    return res.json({
                        res: "Email or username is not confirmed. You can try again within the next 24 hours or consider changing your login or password."
                    });
                db_1.default.all(`SELECT id FROM unconfirmed_users WHERE email = ?;`, [query['email']], (errUUsers, rowsUUsers) => {
                    const mailOptions = {
                        from: index_1.email, to: query['email'], subject: 'Confirmation Email',
                        html: (0, registerMail_1.default)(`${index_1.frontend_link}/register/confirm/` + rowsUUsers[0].id + '/' + uuid),
                    };
                    index_1.emailTransporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            res.sendStatus(422);
                            return db_1.default.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [query['email']]);
                        }
                        res.json({ res: "Account created successfully. Please check your email and follow the link to confirm your account." });
                    });
                });
            });
        });
    });
}
exports.default = register;
//# sourceMappingURL=register.js.map