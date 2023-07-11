import { dbCommands, db } from '../../db/index.js';
import { setEvent, socketEmit } from '../utils/index.js';

const login = (socket, data) => {
  const clientAddress = socket.handshake ? socket.handshake.url : socket.url;
  if (typeof data !== 'object' || !('login' in data) || !('hash' in data))
    return socketEmit(socket, 'error', 400);

  db.all(`SELECT email, id FROM users 
  WHERE (username = ? OR email = ?) AND hash = ?;`,
    [data['login'], data['login'], data['hash']], (err, rows) => {
      if (rows.length !== 1)
        return socketEmit(socket, 'login', false);

      socketEmit(socket, 'login', { id: rows[0].id, handshake: clientAddress });
      dbCommands.setClientAddress(data['login'], clientAddress);
    });
};

setEvent('login', login);