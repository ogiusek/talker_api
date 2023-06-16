const auth = require('./auth');

function defineSocket(socket) {
    auth(socket);

}

module.exports = defineSocket;