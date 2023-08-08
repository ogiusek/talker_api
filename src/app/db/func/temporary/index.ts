import db from '../../db';

function removeTemporaryData(clientAddress: any) {
  db.run(`DELETE FROM typing WHERE user = (SELECT user_id FROM users_addresses WHERE clientAddress = ?);`, [clientAddress]);
}

export default removeTemporaryData;