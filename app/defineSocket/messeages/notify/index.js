const { db } = require('../../../db');
const clients = require('../../clients');

function notify(user) {
  db.all(`SELECT clientAddress FROM users_addresses WHERE user_id = ?;`, [user], (_, addressesRows) => {
    if (addressesRows.length === 0) return;
    db.all(`SELECT DISTINCT from_user, id,  content, content_type FROM messeages
            WHERE to_user = ? AND notified = 0;`, [user], (err, rows) => {
      if (err) return console.log(err);

      addressesRows.map(address => {
        rows.map(messeage => {
          db.all(`SELECT by_user FROM blocked_users WHERE by_user = ? AND blocked_user = ?;`, [user, messeage.from_user], (err, blockedRows) => {
            if (err || blockedRows.length !== 0) return;
            db.run(`UPDATE messeages SET notified = 1 WHERE id = ?;`, [messeage.id]);
            clients[address.clientAddress].socket.emit('messeage', messeage);
          });
        });
      });

    });
  });
}

module.exports = notify;