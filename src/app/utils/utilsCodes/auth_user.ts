import db from '../../db/db';
import { socketEmit } from '../../defineSocket/utils/index';
import clients from '../../defineSocket/utils/clients';

function auth_user(socket: any, data: any, onLogin: any, onWrongData = () => { }) {
  const socketIsHandshake = typeof socket !== 'object';

  db.all(`SELECT user_id FROM users_addresses WHERE user_id = ? AND clientAddress = ?;`,
    [data['user_id'], socketIsHandshake ? socket : (socket.uniqueAddress)], (_: any, rows: any) => {
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