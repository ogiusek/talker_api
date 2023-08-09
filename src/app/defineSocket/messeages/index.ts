import db from '../../db/db';
import { getFileId } from '../../db/db.commands';
import auth_user from '../../utils/utilsCodes/auth_user';
import notify from './notify/index';
import { clients, setEvent, socketEmit } from '../utils/index';

import markAsReaden from './read/index';
import { for_address } from '../../utils';

const Messeage = (socket: any, data: any) => {
  const content_type = !('content_type' in data) ? 'text' : data['content_type'];
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data) || !('content' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    getFileId(data['content'], (file_id: any) => {
      db.run(`INSERT INTO messeages(content_id, content_type, from_user, to_user) VALUES(?, ?, ?, ?);`,
        [file_id, content_type, data['user_id'], data['to_id']], (err: any, _: any) => {
          if (err) return socketEmit(socket, "error", 400);
          db.all(`SELECT * FROM messeages WHERE content_id = ? AND content_type = ? AND from_user = ? AND to_user = ? ORDER BY id DESC LIMIT 1;`,
            [file_id, content_type, data['user_id'], data['to_id']], (err: any, rows: any) => {
              for_address(data['user_id'], (address: any) => {
                socketEmit(clients[address].socket, "messeage", { ...rows[0], content: data['content'] });
              });
              notify(data['to_id']);
            });
        });
    });
  });
}

export default function messeage() {
  markAsReaden();
  setEvent('messeage', Messeage);
}