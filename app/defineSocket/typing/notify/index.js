import db from '../../../db/db.js';
import { socketEmit, clients } from '../../utils/index.js';

function notify(user, to) {
  db.all(`SELECT user_address FROM typing_wait WHERE user = ? AND to_user = ?`, [user, to], (err, waitingRows) => {
    if (waitingRows.length === 0)
      return;

    waitingRows.map(e => {
      const clientAddress = e.user_address;
      if (!clients[clientAddress])
        return;
      const socket = clients[clientAddress].socket;
      db.all(`SELECT user FROM typing WHERE user = ? AND to_user = ?;`, [user, to], (err, rows) => {
        socketEmit(socket, 'typing', {
          typer: user,
          typing: rows.length > 0,
        });
      });
    });
  });
}

export default notify;