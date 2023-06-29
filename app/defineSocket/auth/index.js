const login = require('./login');
const logout = require('./logout');

const removeUnregisteredAccounts = require('../../db/func/remove/removeUnregistered');

setInterval(() => {
  removeUnregisteredAccounts();
}, 1000 * 60 * 60 * 24);

function auth(socket) {
  login(socket);
  logout(socket);
}

module.exports = auth;