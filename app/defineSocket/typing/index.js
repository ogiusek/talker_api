const type = require('./type');
const type_wait = require('./type_wait');

function typeMain(socket) {
  type(socket);
  type_wait(socket);
}

module.exports = typeMain;