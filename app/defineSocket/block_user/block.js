import db from "../../db/db.js";

import auth_user from "../../utils/utilsCodes/auth_user.js";
import { setEvent, socketEmit } from "../utils/index.js";

const Block = (socket, data) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    db.run(`INSERT INTO blocked_users(by_user, blocked_user) 
    VALUES((SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1), ?);`,
      [socket.uniqueAddress, data['user_id'], data['blocked_id']], (err, _) => {
        if (err) socketEmit(socket, 'error', 422);
      });
  });
}

export default function block() {
  setEvent('block_user', Block);
}