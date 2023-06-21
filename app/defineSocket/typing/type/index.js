const typing = require('./typing');
const type_wait = require('../type_wait');

function type(socket) {
  typing(socket);
  type_wait(socket);
}

module.exports = type;