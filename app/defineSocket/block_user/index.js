const db = require("../../db/db");

const { auth_user } = require('../../utils');

function block_user(socket) {
  socket.on('block_user', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
      return socket.emit('block_user', 'wrong data');

    auth_user(socket, data, () => {
      db.run(`INSERT INTO blocked_users(by_user, blocker_user) 
      VALUES((SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1), ?);`,
        [socket.handshake.url, data['user_id'], data['blocked_id']], (err, _) => {
          if (err)
            socket.emit('block_user', !err);
        });
    });
  });

  socket.on('unlock_user', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
      return socket.emit('unblock_user', 'wrong data');

    auth_user(socket, data, () => {
      db.run(`DELETE FROM blocked_users WHERE 
        (SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1) AND blocked_user = ?;`,
        [socket.handshake.url, data['user_id'], data['blocked_id']], (err, _) => {
          if (err)
            socket.emit('unblock_user', !err);
        });
    });
  });
}

module.exports = block_user;