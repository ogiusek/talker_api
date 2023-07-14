import db from '../../db';

function removeUnregisteredAccounts() {
  db.run(`DELETE FROM unconfirmed_users WHERE init_date < ?;`, [
    new Date(Date.now() - 24 * 60 * 60 * 1000)]);
}

export default removeUnregisteredAccounts;