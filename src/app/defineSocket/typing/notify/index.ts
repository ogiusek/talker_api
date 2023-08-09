import db from '../../../db/db';
import { for_address } from '../../../utils';
import { socketEmit, clients } from '../../utils/index';

function notify(user: any, to: any) {
  for_address(to, (address: any) => {
    const socket = clients[address]?.socket;
    if (socket === undefined) return;

    db.all(`SELECT user FROM typing WHERE user = ? AND to_user = ?;`, [user, to], (err: any, rows: any) => {
      socketEmit(socket, 'typing', {
        typer: user,
        typing: rows.length > 0,
      });
    });
  });
}

export default notify;