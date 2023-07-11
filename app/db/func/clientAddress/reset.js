import db from '../../db.js';

const resetClientAddress = (addr) => {
  db.run(`DELETE FROM users_addresses WHERE clientAddress = ?;`, [addr]);
}

export default resetClientAddress