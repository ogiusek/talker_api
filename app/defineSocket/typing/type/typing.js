const db = require('../../../db/db');

const { runTimer, typing } = require('../utils');
const on_stop_typing = require('./on_stop_typing');
const notify = require('../notify');

const { auth_user } = require('../../../utils');

function type(socket) {
  socket.on('type', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
      return socket.emit('error', 400);

    auth_user(socket, data, () => {
      const identyfier = data['user_id'] + '-' + data['to_id'];

      if (typing[identyfier] === undefined) {
        typing[identyfier] = { 'func': on_stop_typing(data, identyfier) };

        db.run(`INSERT INTO typing(user, to_user) VALUES(?, ?);`,
          [data['user_id'], data['to_id']], () => {
            notify(data['user_id'], data['to_id']);
          });
      }

      runTimer(identyfier);
    });
  });
}

module.exports = type;