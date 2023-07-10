const { db } = require('../../../db');
const { for_address } = require('../../../utils');
const { socketEmit, clients } = require('../../utils');

function notify(messeage_id) {
  db.all(`SELECT from_user FROM messeages WHERE id = ?;`, [messeage_id], (err, rows) => {
    if (err || rows.length !== 1) return;
    for_address(rows[0].from_user, address => {
      socketEmit(clients[address].socket, 'notified', { messeage_id: messeage_id });
    });
  });
};

module.exports = notify;