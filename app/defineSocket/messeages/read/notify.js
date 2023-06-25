const { db } = require('../../../db');
const { for_address } = require('../../../utils');
const clients = require('../../clients');

function notify(data) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`,
    [data['messeage_id']], (err, rows) => {
      for_address(rows[0].from_user, address => {
        clients[address].socket.emit('read', {
          messeage_id: data['messeage_id']
        });
      });
    });
}

module.exports = notify;