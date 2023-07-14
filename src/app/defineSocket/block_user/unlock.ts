import db from "../../db/db";

import auth_user from "../../utils/utilsCodes/auth_user";
import { setEvent, socketEmit } from "../utils/index";

const Unlock = (socket: any, data: any) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    db.run(`DELETE FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`,
      [data['user_id'], data['blocked_id']], (err: any, _: any) => {
        if (err) return socketEmit(socket, 'error', 422);
      });
  });
}

export default function unlock() {
  setEvent('unlock_user', Unlock);
}