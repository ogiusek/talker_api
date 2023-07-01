const db = require('../../db');

const setClientAddress = (login, addr) => {
  db.run(`INSERT INTO users_addresses(user_id, clientAddress) 
  VALUES((SELECT id FROM users WHERE email = ? OR username = ?), ?);`, [login, login, addr], (err) => { });
}

module.exports = setClientAddress;