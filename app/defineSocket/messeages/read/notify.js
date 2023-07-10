const { db } = require('../../../db');
const { for_address } = require('../../../utils');
const { socketEmit, clients } = require('../../utils');

function notify(data) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`,
    [data['messeage_id']], (err, rows) => {
      for_address(rows[0].from_user, address => {
        socketEmit(clients[address].socket, 'read', { messeage_id: data['messeage_id'] });
      });
    });
}

module.exports = notify;