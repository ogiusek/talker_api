const db = require('../../db/db');

function for_address(user_id, callback) {
  db.all(`SELECT clientAddress FROM users_addresses WHERE user_id = ?;`, [user_id], (err, rows) => {
    if (err || rows.length === 0) return;
    rows.map(address => {
      try {
        callback(address.clientAddress);
      } catch (err) { }
    });
  });
}

module.exports = for_address;