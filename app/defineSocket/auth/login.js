const dbCommands = require('../../db/db.commands');
const db = require('../../db/db');

function login(socket) {
  const clientAddress = socket.handshake.url;

  const login = (data) => {
    if (typeof data !== 'object' || !('login' in data) || !('hash' in data))
      return socket.emit('error', 400);

    db.all(`SELECT email, id FROM users 
      WHERE (username = ? OR email = ?) AND hash = ?;`,
      [data['login'], data['login'], data['hash']], (err, rows) => {
        if (rows.length !== 1)
          return socket.emit("login", false);

        socket.emit("login", { id: rows[0].id, handshake: socket.handshake.url });
        dbCommands.setClientAddress(data['login'], clientAddress);
      });
  };

  if (Object.keys(socket.handshake.auth).length)
    login(socket.handshake.auth);

  socket.on('login', login);
}

module.exports = login;