const { db } = require('../../../db');
const { for_address } = require('../../../utils');
const clients = require('../../clients');

function notify(data) {
  db.all(`SELECT from_id FROM messeages WHERE id = ?;`,
    [data['messeage_id']], (err, rows) => {
      for_address(rows, address => {
        clients[address].socket.emit('read', {
          messeage_id: data['messeage_id']
        });
      });
    });
}

module.exports = notify;