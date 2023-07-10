const db = require('../../../db/db');

const { auth_user } = require('../../../utils');
const { setEvent, socketEmit } = require('../../utils');
const notify = require('../notify');

const type_wait = (socket, data) => {
  const clientAddress = socket.handshake ? socket.handshake.url : socket.url;
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
    return socketEmit(socket, 'error', 400);

  auth_user(socket, data, () => {
    db.run(`DELETE FROM typing_wait WHERE user_address = ?;`,
      [clientAddress], () => {
        db.run(`INSERT INTO typing_wait(user, user_address, to_user) VALUES(?, ?, ?)`,
          [data['to_id'], clientAddress, data['user_id']], () => {
            notify(data['to_id'], data['user_id']);
          });
      });
  });
}

setEvent('type_wait', type_wait);