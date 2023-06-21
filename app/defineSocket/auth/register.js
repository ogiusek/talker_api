const { v4: uuidv4 } = require('uuid');
const { emailTransporter, emailPass, frontend_link, email } = require('../../utils');
const dbCommands = require('../../db/db.commands.js');
const db = require('../../db/db');
const GetRegisterMail = require('./registerMail');

function register(socket) {
  const check = (data, rows) => {
    if (rows.length !== 0) {
      if (rows.find(e => e.username === data['username']))
        socket.emit("register", "Username exists");
      else
        socket.emit("register", "Email is used");
      return true;
    }
    return false;
  }

  socket.on('register', data => {
    if (typeof data !== 'object' || !('hash' in data) || !('email' in data) || !('username' in data))
      return socket.emit('register', 'wrong data');

    db.all(`SELECT username, email FROM users WHERE username = ? OR email = ?;`,
      [data['username'], data['email']], (errUsers, rowsUsers) => {
        if (errUsers) return socket.emit("register", "Server error or wrong data.");
        if (check(data, rowsUsers)) return;

        const uuid = uuidv4();
        db.run(`INSERT INTO unconfirmed_users(uuid, email, username, hash) 
                VALUES(?, ?, ?, ?);`, [uuid, data['email'], data['username'], data['hash']], (errInsert) => {
          if (errInsert) return socket.emit("register",
            "Email or username is not confirmed. You can try again within the next 24 hours or consider changing your login or password.");

          db.all(`SELECT id FROM unconfirmed_users WHERE email = ?;`, [data['email']], (errUUsers, rowsUUsers) => {
            const mailOptions = {
              from: email, to: data['email'], subject: 'Confirmation Email',
              html: GetRegisterMail(`${frontend_link}/register/confirm/` + rowsUUsers[0].id + '/' + uuid),
            };

            emailTransporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                db.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [data['email']]);
                return socket.emit("register", "Error while sending email.")
              };
              socket.emit("register",
                "Account created successfully. Please check your email and follow the link to confirm your account.");
            });
          });
        });
      });
  });
}

module.exports = register;