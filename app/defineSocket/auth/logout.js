const dbCommands = require('../../db/db.commands.js');
const { setEvent } = require('../utils');

const logout = (socket, data) => {
  const clientAddress = socket.handshake ? socket.handshake.url : socket.url;
  dbCommands.resetClientAddress(clientAddress);
}

setEvent('logout', logout);