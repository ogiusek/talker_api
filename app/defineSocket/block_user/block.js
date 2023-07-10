const db = require("../../db/db");

const { auth_user } = require('../../utils');
const { setEvent, socketEmit } = require("../utils");

const block = (socket, data) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    db.run(`INSERT INTO blocked_users(by_user, blocked_user) 
    VALUES((SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1), ?);`,
      [socket.handshake.url, data['user_id'], data['blocked_id']], (err, _) => {
        if (err) socketEmit(socket, 'error', 422);
      });
  });
}

setEvent('block_user', block);
