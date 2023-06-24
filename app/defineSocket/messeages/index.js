const { db } = require('../../db');
const { auth_user } = require('../../utils');

const notify = require('./notify');
const markAsReaden = require('./read');

function messeage(socket) {
  markAsReaden(socket);


  socket.on('messeage', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data) ||
      !('content' in data) || !('content_type' in data))
      return socket.emit('error', 400);

    auth_user(socket, data, () => {
      db.run(`INSERT INTO messeages(content, content_type, from_user, to_user) VALUES(?, ?, ?, ?);`,
        [data['content'], data['content_type'], data['user_id'], data['to_id']], (err, _) => {
          if (err) return socket.emit('error', 'Wrong content type or to long messeage');

          db.run(`UPDATE messeages set readen = CURRENT_TIMESTAMP
            WHERE readen = NULL AND to_user = ? AND from_user = ?;`, [data['user_id'], data['to_id']]);

          notify(data['to_id']);
        });
    });
  });
}

module.exports = messeage;