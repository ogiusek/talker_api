const db = require('../../../db/db');
const { typing } = require('../utils');
const notify = require('../notify');

function on_stop_typing(data, identyfier) {
  return () => {
    typing[identyfier] = undefined;
    db.run(`DELETE FROM typing WHERE user = ? AND to_user = ?;`,
      [data['user_id'], data['to_id']], () => {
        notify(data['user_id'], data['to_id']);
      });
  }
}

module.exports = on_stop_typing;