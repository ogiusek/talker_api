import db from '../../db';

function removeTemporaryData(clientAddress: any) {
  db.run(`DELETE FROM typing WHERE user = (SELECT user_id FROM users_addresses WHERE clientAddress = ?);`, [clientAddress]);
  db.run(`DELETE FROM typing_wait WHERE user_address = ?;`, [clientAddress]);
}

export default removeTemporaryData;