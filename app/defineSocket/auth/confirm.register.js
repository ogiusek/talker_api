const { default_avatar } = require('../../utils');
const dbCommands = require('../../db/db.commands.js');
const db = require('../../db/db.js');

function confirm_register(socket) {
  const clientAddress = socket.handshake.address;

  socket.on('confirm_register', data => {
    if (typeof data !== 'object' || !('id' in data) || !('uuid' in data))
      return socket.emit('confirm_register', 'wrong data');

    db.all(`SELECT email, username, hash FROM unconfirmed_users WHERE id = ? AND uuid = ?;`, [data['id'], data['uuid']], (err, rows) => {
      if (err) return socket.emit('confirm_register', 'Server error');
      if (rows.length !== 1) return socket.emit('confirm_register', 'Wrong or out dated link');
      const user = rows[0];

      db.run(`INSERT INTO users(avatar, email, username, hash) VALUES(?, ?, ?, ?);`, [default_avatar, user.email, user.username, user.hash]);
      db.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [user.email]);

      socket.emit('confirm_register', 'Success you can login');
    });
  });
}

module.exports = confirm_register;