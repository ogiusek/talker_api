import db from "../../db/db.js";

import auth_user from "../../utils/utilsCodes/auth_user.js";
import { setEvent, socketEmit } from "../utils/index.js";

const unlock = (socket, data) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('blocked_id' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    db.run(`DELETE FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`,
      [data['user_id'], data['blocked_id']], (err, _) => {
        if (err) return socketEmit('error', 422);
      });
  });
}

setEvent('unlock_user', unlock);
