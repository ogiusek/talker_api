const db = require('../../../db/db');

const { auth_user } = require('../../../utils');
const notify = require('../notify');

function type_wait(socket) {
  socket.on('type_wait', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
      return socket.emit('type_wait', 'wrong data');

    auth_user(socket, data, () => {
      db.run(`DELETE FROM typing_wait WHERE user_address = ?;`,
        [socket.handshake.url], () => {
          db.run(`INSERT INTO typing_wait(user, user_address, to_user) VALUES(?, ?, ?)`,
            [data['to_id'], socket.handshake.url, data['user_id']], () => {
              notify(data['to_id'], data['user_id']);
            });
        });
    });
  });
}

module.exports = type_wait;