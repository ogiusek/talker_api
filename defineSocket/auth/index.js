const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const confirm_register = require('./confirm.register');

function auth(socket) {
    login(socket);
    logout(socket);
    register(socket);
    confirm_register(socket);
}

module.exports = auth;