const dbCommands = require('../../db/db.commands');
const db = require('../../db/db');

function confirm_register(socket) {
  socket.on('confirm_register', data => {
    if (typeof data !== 'object' || !('id' in data) || !('uuid' in data))
      return socket.emit('error', 400);

    db.all(`SELECT email, username, hash FROM unconfirmed_users WHERE id = ? AND uuid = ?;`, [data['id'], data['uuid']], (err, rows) => {
      if (err) return socket.emit('error', 422);
      if (rows.length !== 1) return socket.emit('confirm_register', 'Wrong or out dated link');
      const user = rows[0];

      db.run(`INSERT INTO users(email, username, hash) VALUES(?, ?, ?, ?);`, [user.email, user.username, user.hash]);
      db.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [user.email]);

      socket.emit('confirm_register', 'Success you can login');
    });
  });
}

module.exports = confirm_register;