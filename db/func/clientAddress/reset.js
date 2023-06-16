const db = require('../../db');

const resetClientAddress = (addr) => {
    db.run(`DELETE FROM users_addresses WHERE clientAddress = ?;`, [addr]);
}

module.exports = resetClientAddress;