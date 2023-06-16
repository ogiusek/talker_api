const dbCommands = require('../../db/db.commands');
const db = require('../../db/db');

function login(socket) {
    const clientAddress = socket.handshake.address;

    socket.on('login', data => {
        db.all(`SELECT email FROM users 
            WHERE (username = ? OR email = ?) AND hash = ?;`,
            [data['login'], data['login'], data['hash']], (err, rows) => {
                if (rows.length !== 1)
                    return socket.emit("login", false);

                socket.emit("login", true);
                dbCommands.setClientAddress(data['login'], clientAddress);
            });
    });
}

module.exports = login;