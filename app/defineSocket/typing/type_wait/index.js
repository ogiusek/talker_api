import db from '../../../db/db.js';
import { auth_user } from '../../../utils/index.js';
import { setEvent, socketEmit } from '../../utils/index.js';
import notify from '../notify/index.js';

const Type_wait = (socket, data) => {
  const clientAddress = socket.uniqueAddress;
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
    return socketEmit(socket, 'error', 400);

  auth_user(socket, data, () => {
    db.run(`DELETE FROM typing_wait WHERE user_address = ?;`,
      [clientAddress], () => {
        db.run(`INSERT INTO typing_wait(user, user_address, to_user) VALUES(?, ?, ?)`,
          [data['to_id'], clientAddress, data['user_id']], () => {
            notify(data['to_id'], data['user_id']);
          });
      });
  });
}

export default function type_wait() {
  setEvent('type_wait', Type_wait);
}