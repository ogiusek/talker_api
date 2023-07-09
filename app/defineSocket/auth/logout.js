const dbCommands = require('../../db/db.commands.js');

function logout(socket) {
  const clientAddress = socket.handshake ? socket.handshake.url : socket.url;

  socket.on('logout', _ => {
    dbCommands.resetClientAddress(clientAddress);
  });
}

module.exports = logout;