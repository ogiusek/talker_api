const db = require('../../db/db');

function auth_user(socket, data, callback) {
  db.all(`SELECT user_id FROM users_addresses WHERE user_id = ? AND clientAddress = ?;`,
    [data['user_id'], socket.handshake.url], (err, rows) => {
      if (rows.length !== 1)
        return socket.emit('auth', false);

      callback();
    });
}

module.exports = auth_user;