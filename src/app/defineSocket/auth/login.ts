import { dbCommands, db } from '../../db/index';
import { setEvent, socketEmit } from '../utils/index';

const Login = (socket: any, data: any) => {
  const clientAddress = socket.uniqueAddress;
  if (typeof data !== 'object' || !('login' in data) || !('hash' in data))
    return socketEmit(socket, 'error', 400);

  db.all(`SELECT email, id FROM users 
  WHERE (username = ? OR email = ?) AND hash = ?;`,
    [data['login'], data['login'], data['hash']], (err: any, rows: any) => {
      if (rows.length !== 1) return socketEmit(socket, 'login', false);

      socketEmit(socket, 'login', { id: rows[0].id, handshake: clientAddress });
      dbCommands.setClientAddress(data['login'], clientAddress);
    });
};

export default function login() {
  setEvent('login', Login);
};