import db from "../../db/db";

import auth_user from "../../utils/utilsCodes/auth_user";
import { setEvent, socketEmit } from "../utils/index";

const Block = (socket: any, data: any) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    db.run(`INSERT INTO blocked_users(by_user, blocked_user) 
    VALUES((SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1), ?);`,
      [socket.uniqueAddress, data['user_id'], data['blocked_id']], (err: any, _: any) => {
        if (err) socketEmit(socket, 'error', 422);
      });
  });
}

export default function block() {
  setEvent('block_user', Block);
}