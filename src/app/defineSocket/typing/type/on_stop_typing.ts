import db from '../../../db/db';
import { typing } from '../utils';
import notify from '../notify/index';

function on_stop_typing(data: any, identyfier: any) {
  return () => {
    typing[identyfier] = undefined;
    db.run(`DELETE FROM typing WHERE user = ? AND to_user = ?;`,
      [data['user_id'], data['to_id']], () => {
        notify(data['user_id'], data['to_id']);
      });
  }
}

export default on_stop_typing;