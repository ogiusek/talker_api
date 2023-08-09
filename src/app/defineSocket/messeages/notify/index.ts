import db from '../../../db/db';
import { for_address } from '../../../utils/index';
import { socketEmit, clients } from '../../utils/index';

import notify_notified from "./notify.notified";

function notify(user: any) {
  db.all(`SELECT DISTINCT from_user, to_user, id, (SELECT value FROM files WHERE files.id = content_id) AS content, content_type, readen, notified, init_date FROM messeages
  WHERE to_user = ? AND notified = 0;`, [user], (err: any, rows: any) => {
    if (err) return;

    for_address(user, (address: any) => {
      rows.map((messeage: any) => {
        db.all(`SELECT by_user FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`, [user, messeage.from_user], (err: any, blockedRows: any) => {
          if (err || blockedRows.length !== 0) return;
          db.run(`UPDATE messeages SET notified = 1 WHERE id <= ? AND from_user = ?;`, [messeage.id, messeage.from_user]);

          socketEmit(clients[address].socket, "messeage", messeage);
          notify_notified(messeage.id);
        });
      });
    });
  });
}

export default notify;