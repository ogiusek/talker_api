import db from '../../../db/db.js';
import { for_address } from '../../../utils/index.js';
import { socketEmit, clients } from '../../utils/index.js';

function notify(messeage_id) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`, [messeage_id], (err, rows) => {
    if (err || rows.length !== 1) return;
    for_address(rows[0].from_user, address => {
      socketEmit(clients[address].socket, 'notified', { messeage_id: messeage_id });
    });
  });
};

export default notify;