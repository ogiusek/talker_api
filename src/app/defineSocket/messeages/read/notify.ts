import db from '../../../db/db';
import for_address from '../../../utils/utilsCodes/for_address';
import { socketEmit, clients } from '../../utils/index';

function notify(data: any) {
  db.all(`SELECT from_user, readen FROM messeages WHERE id = ? AND to_user = ?;`,
    [data['messeage_id'], data['user_id']], (err: any, rows: any) => {
      if (rows.length !== 1) return;
      for_address(rows[0].from_user, (address: any) => {
        socketEmit(clients[address].socket, 'read', { messeage_id: data['messeage_id'], date: rows[0].readen });
      });
    });
}

export default notify;