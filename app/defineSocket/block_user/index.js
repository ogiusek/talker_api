const db = require("../../db/db");

function block_user(socket) {
  socket.on('block_user', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
      return socket.emit('block_user', 'wrong data');

    db.run(`INSERT INTO blocked_users(by_user, blocker_user) 
      VALUES((SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1), ?);`,
      [socket.handshake.address, data['user_id'], data['blocked_id']]);
  });


  socket.on('blocked_users', data => {
    if (typeof data !== 'object' || !('user_id' in data))
      return socket.emit('block_user', 'wrong data');

    db.all(`SELECT * FROM blocked_users WHERE by_user = (SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1);`,
      [socket.handshake.address, data['user_id']], (err, rows) => {
        socket.emit('blocked_users', rows);
      });
  });


  socket.on('unblock_user', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
      return socket.emit('unblock_user', 'wrong data');

    db.run(`DELETE FROM blocked_users WHERE 
      (SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1) AND blocked_user = ?;`,
      [socket.handshake.address, data['user_id'], data['blocked_id']], (err, _) => {
        socket.emit('unblock_user', !err);
      });
  });


}

module.exports = block_user;