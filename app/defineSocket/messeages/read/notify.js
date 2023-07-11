import db from '../../../db/db.js';
import for_address from '../../../utils/utilsCodes/for_address.js';
import { socketEmit, clients } from '../../utils/index.js';

function notify(data) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`,
    [data['messeage_id']], (err, rows) => {
      for_address(rows[0].from_user, address => {
        socketEmit(clients[address].socket, 'read', { messeage_id: data['messeage_id'] });
      });
    });
}

export default notify;