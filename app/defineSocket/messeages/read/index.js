const { db } = require('../../../db');
const { auth_user } = require("../../../utils");
const { setEvent, socketEmit } = require('../../utils');
const notify = require('./notify');

const markAsReaden = (socket, data) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('messeage_id' in data))
    return socketEmit(socket, 'error', 400);

  auth_user(socket, data, () => {
    db.run(`UPDATE messeages SET readen = CURRENT_TIMESTAMP WHERE readen = NULL AND id <= ?  AND from_user = ?;`,
      [data['messeage_id'], data['user_id']], () => {
        notify(data);
      });
  });
}

setEvent('read', markAsReaden);