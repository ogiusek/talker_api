const { db } = require('../../db');
const { getFileId } = require('../../db/db.commands');
const { auth_user } = require('../../utils');
const notify = require('./notify');
const { setEvent } = require('../utils');

require('./read');

const messeage = (socket, data) => {
  const content_type = !('content_type' in data) ? 'text' : data['content_type'];
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data) || !('content' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    getFileId(data['content'], file_id => {
      db.run(`INSERT INTO messeages(content_id, content_type, from_user, to_user) VALUES(?, ?, ?, ?);`,
        [file_id, content_type, data['user_id'], data['to_id']], (err, _) => {
          if (err) return socketEmit(socket, "error", 400);

          notify(data['to_id']);
        });
    });
  });
}

setEvent('messeage', messeage);