import db from '../../../db/db';
import { for_address } from '../../../utils/index';
import { socketEmit, clients } from '../../utils/index';

function notify(messeage_id: any) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`, [messeage_id], (err: any, rows: any) => {
    if (err || rows.length !== 1) return;
    for_address(rows[0].from_user, (address: any) => {
      socketEmit(clients[address].socket, 'notified', { messeage_id: messeage_id });
    });
  });
};

export default notify;