import { v4 as uuidv4 } from 'uuid';
import { emailTransporter, frontend_link, email } from '../../utils/index';
import db from '../../db/db';
import GetRegisterMail from './utils/registerMail';

function register(app: any) {
  app.get('/register', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('hash' in query) || !('email' in query) || !('username' in query))
      return res.sendStatus(400);

    db.all(`SELECT username, email FROM users WHERE username = ? OR email = ?;`,
      [query['username'], query['email']], (errUsers: any, rowsUsers: any) => {
        if (errUsers) return res.json({ res: "Server error or wrong query." });
        if (rowsUsers.length !== 0) return res.json({ res: rowsUsers.find((e: any) => e.username === query['username']) ? "Username exists" : "Email is used" });

        const uuid = uuidv4();
        db.run(`INSERT INTO unconfirmed_users(uuid, email, username, hash) 
        VALUES(?, ?, ?, ?);`, [uuid, query['email'], query['username'], query['hash']], (errInsert: any) => {
          if (errInsert) return res.json({
            res: "Email or username is not confirmed. You can try again within the next 24 hours or consider changing your login or password."
          });

          db.all(`SELECT id FROM unconfirmed_users WHERE email = ?;`, [query['email']], (errUUsers: any, rowsUUsers: any) => {
            const mailOptions = {
              from: email, to: query['email'], subject: 'Confirmation Email',
              html: GetRegisterMail(`${frontend_link}/register/confirm/` + rowsUUsers[0].id + '/' + uuid),
            };

            emailTransporter.sendMail(mailOptions, (error: any, info: any) => {
              if (error) {
                res.sendStatus(422);
                return db.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [query['email']]);
              }

              res.json({ res: "Account created successfully. Please check your email and follow the link to confirm your account." });
            });
          });
        });

      });
  });
}

export default register;