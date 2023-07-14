import db from '../../db/db';

function for_address(user_id: any, callback: any) {
  db.all(`SELECT clientAddress FROM users_addresses WHERE user_id = ?;`, [user_id], (err: any, rows: any) => {
    if (err || rows.length === 0) return;
    rows.map((address: any) => {
      try {
        callback(address.clientAddress);
      } catch (err) { }
    });
  });
}

export default for_address;