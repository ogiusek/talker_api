const db = require('../../db/db');
const clients = require('../../defineSocket/clients');

function auth_user(socket, data, callback) {
  const socketIsHandshake = typeof socket !== 'object';

  db.all(`SELECT user_id FROM users_addresses WHERE user_id = ? AND clientAddress = ?;`,
    [data['user_id'], socketIsHandshake ? socket : socket.handshake.url], (err, rows) => {
      try {
        if (rows.length === 1) return callback();

        const realSocket = socketIsHandshake ?
          clients[socket].socket :
          socket;
        realSocket.emit('auth', false);
      } catch (err) { }
    });
}

module.exports = auth_user;