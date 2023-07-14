import db from '../../../db/db';
import { socketEmit, clients } from '../../utils/index';

function notify(user: any, to: any) {
  db.all(`SELECT user_address FROM typing_wait WHERE user = ? AND to_user = ?`, [user, to], (err: any, waitingRows: any) => {
    if (waitingRows.length === 0)
      return;

    waitingRows.map((e: any) => {
      const clientAddress = e.user_address;
      if (!clients[clientAddress])
        return;
      const socket = clients[clientAddress].socket;
      db.all(`SELECT user FROM typing WHERE user = ? AND to_user = ?;`, [user, to], (err: any, rows: any) => {
        socketEmit(socket, 'typing', {
          typer: user,
          typing: rows.length > 0,
        });
      });
    });
  });
}

export default notify;