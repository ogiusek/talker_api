const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const confirm_register = require('./confirm.register');

const removeUnregisteredAccounts = require('../../db/func/remove/removeUnregistered');

setInterval(() => {
    removeUnregisteredAccounts();
}, 1000 * 60 * 60);

function auth(socket) {
    login(socket);
    logout(socket);
    register(socket);
    confirm_register(socket);
}

module.exports = auth;