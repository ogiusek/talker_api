import db from '../../../db/db.js';
import { typing } from '../utils.js';
import notify from '../notify/index.js';

function on_stop_typing(data, identyfier) {
  return () => {
    typing[identyfier] = undefined;
    db.run(`DELETE FROM typing WHERE user = ? AND to_user = ?;`,
      [data['user_id'], data['to_id']], () => {
        notify(data['user_id'], data['to_id']);
      });
  }
}

export default on_stop_typing;