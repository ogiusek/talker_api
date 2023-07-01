const { db } = require('../../../db');
const { for_address } = require('../../../utils');
const clients = require('../../clients');

const notify_notified = require('./notify.notified');

function notify(user) {
  db.all(`SELECT DISTINCT from_user, to_user, id, (SELECT value FROM files WHERE files.id = content_id) AS content, content_type, readen, notified, init_date FROM messeages
  WHERE to_user = ? AND notified = 0;`, [user], (err, rows) => {
    if (err) return;

    for_address(user, address => {
      rows.map(messeage => {
        db.all(`SELECT by_user FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`, [user, messeage.from_user], (err, blockedRows) => {
          if (err || blockedRows.length !== 0) return;
          db.run(`UPDATE messeages SET notified = 1 WHERE id <= ? AND from_user = ?;`, [messeage.id, messeage.from_user]);
          clients[address].socket.emit('messeage', messeage);
          notify_notified(messeage.id);
        });
      });
    });
  });
}

module.exports = notify;