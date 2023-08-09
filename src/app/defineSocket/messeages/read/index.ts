import db from '../../../db/db';
import { auth_user } from '../../../utils/index';
import { setEvent, socketEmit } from '../../utils/index';
import notify from './notify';

const MarkAsReaden = (socket: any, data: any) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('messeage_id' in data))
    return socketEmit(socket, 'error', 400);

  auth_user(socket, data, () => {
    db.all(`SELECT COUNT(id) AS count FROM messeages 
      WHERE readen IS NULL AND id <= ? AND to_user = ? AND from_user = (SELECT from_user FROM messeages WHERE id = ?);`,
      [data['messeage_id'], data['user_id'], data['messeage_id']], (err: any, rows: any) => {
        rows[0].count >= 1 &&
          db.run(`UPDATE messeages SET readen = CURRENT_TIMESTAMP 
            WHERE readen IS NULL AND id <= ? AND to_user = ? AND from_user = (SELECT from_user FROM messeages WHERE id = ?);`,
            [data['messeage_id'], data['user_id'], data['messeage_id']], () => {
              notify(data);
            });
      })
  });
}

export default function markAsReaden() {
  setEvent('read', MarkAsReaden);
}