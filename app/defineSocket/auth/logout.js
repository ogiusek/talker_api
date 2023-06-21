const dbCommands = require('../../db/db.commands.js');

function logout(socket) {
  const clientAddress = socket.handshake.url;

  socket.on('logout', _ => {
    dbCommands.resetClientAddress(clientAddress);
  });
}

module.exports = logout;