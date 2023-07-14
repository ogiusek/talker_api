import db from '../../../db/db';
import for_address from '../../../utils/utilsCodes/for_address';
import { socketEmit, clients } from '../../utils/index';

function notify(data: any) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`,
    [data['messeage_id']], (err: any, rows: any) => {
      for_address(rows[0].from_user, (address: any) => {
        socketEmit(clients[address].socket, 'read', { messeage_id: data['messeage_id'] });
      });
    });
}

export default notify;