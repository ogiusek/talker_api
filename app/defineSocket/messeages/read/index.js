import db from '../../../db/db.js';
import { auth_user } from '../../../utils/index.js';
import { setEvent, socketEmit } from '../../utils/index.js';
import notify from './notify.js';

const MarkAsReaden = (socket, data) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('messeage_id' in data))
    return socketEmit(socket, 'error', 400);

  auth_user(socket, data, () => {
    db.run(`UPDATE messeages SET readen = CURRENT_TIMESTAMP WHERE readen = NULL AND id <= ?  AND from_user = ?;`,
      [data['messeage_id'], data['user_id']], () => {
        notify(data);
      });
  });
}

export default function markAsReaden() {
  setEvent('read', MarkAsReaden);
}