import db from '../../db';

const resetClientAddress = (addr: any) => {
  db.run(`DELETE FROM users_addresses WHERE clientAddress = ?;`, [addr]);
}

export default resetClientAddress