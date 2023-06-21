const db = require('../../../db/db');

const clients = require('../../clients');

function notify(user, to) {
  db.all(`SELECT user_address FROM typing_wait WHERE user = ? AND to_user = ?`, [user, to], (err, waitingRows) => {
    if (waitingRows.length === 0)
      return;

    // console.log(waitingRows.length);
    waitingRows.map(e => {
      const clientAddress = e.user_address;
      if (!clients[clientAddress])
        return;
      const socket = clients[clientAddress].socket;
      db.all(`SELECT user FROM typing WHERE user = ? AND to_user = ?;`, [user, to], (err, rows) => {
        socket.emit('typing', {
          typer: user,
          typing: rows.length > 0,
        });
      });
    });
  });
}

module.exports = notify;