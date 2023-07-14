import db from '../../db';

const setClientAddress = (login: any, addr: any) => {
  db.run(`INSERT INTO users_addresses(user_id, clientAddress) 
  VALUES((SELECT id FROM users WHERE email = ? OR username = ?), ?);`, [login, login, addr], (err) => { });
}

export default setClientAddress;