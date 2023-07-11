import db from '../../db/db.js';
import { socketEmit } from '../../defineSocket/utils/index.js';
import clients from '../../defineSocket/utils/clients.js';

function auth_user(socket, data, onLogin, onWrongData = () => { }) {
  const socketIsHandshake = typeof socket !== 'object';

  db.all(`SELECT user_id FROM users_addresses WHERE user_id = ? AND clientAddress = ?;`,
    [data['user_id'], socketIsHandshake ? socket : (socket.handshake ? socket.handshake.url : socket.url)], (err, rows) => {
      try {
        if (rows.length === 1) return onLogin();

        const realSocket = socketIsHandshake ?
          clients[socket].socket :
          socket;
        socketEmit(realSocket, 'auth', false);
        onWrongData();
      } catch (err) { }
    });
}

export default auth_user;