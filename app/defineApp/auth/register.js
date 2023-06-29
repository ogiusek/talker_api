const { v4: uuidv4 } = require('uuid');
const { emailTransporter, frontend_link, email } = require('../../utils');
const db = require('../../db/db');
const GetRegisterMail = require('./registerMail');

function register(app) {
  app.get('/register', (req, res) => {
    const body = req.query;
    if (typeof body !== 'object' || !('hash' in body) || !('email' in body) || !('username' in body))
      return res.sendStatus(400);

    db.all(`SELECT username, email FROM users WHERE username = ? OR email = ?;`,
      [body['username'], body['email']], (errUsers, rowsUsers) => {
        if (errUsers) return res.json({ res: "Server error or wrong body." });
        if (rows.length !== 0) return res.json({ res: rowsUsers.find(e => e.username === body['username']) ? "Username exists" : "Email is used" });

        const uuid = uuidv4();
        db.run(`INSERT INTO unconfirmed_users(uuid, email, username, hash) 
        VALUES(?, ?, ?, ?);`, [uuid, body['email'], body['username'], body['hash']], (errInsert) => {
          if (errInsert) return res.json({
            res: "Email or username is not confirmed. You can try again within the next 24 hours or consider changing your login or password."
          });

          db.all(`SELECT id FROM unconfirmed_users WHERE email = ?;`, [body['email']], (errUUsers, rowsUUsers) => {
            const mailOptions = {
              from: email, to: body['email'], subject: 'Confirmation Email',
              html: GetRegisterMail(`${frontend_link}/register/confirm/` + rowsUUsers[0].id + '/' + uuid),
            };

            emailTransporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.sendStatus(422);
                return db.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [body['email']]);
              }

              res.json({ res: "Account created successfully. Please check your email and follow the link to confirm your account." });
            });
          });
        });

      });
  });
}

module.exports = register;