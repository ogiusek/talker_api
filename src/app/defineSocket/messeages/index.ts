import db from '../../db/db';
import { getFileId } from '../../db/db.commands';
import auth_user from '../../utils/utilsCodes/auth_user';
import notify from './notify/index';
import { setEvent, socketEmit } from '../utils/index';

import markAsReaden from './read/index';

const Messeage = (socket: any, data: any) => {
  const content_type = !('content_type' in data) ? 'text' : data['content_type'];
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data) || !('content' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    getFileId(data['content'], (file_id: any) => {
      db.run(`INSERT INTO messeages(content_id, content_type, from_user, to_user) VALUES(?, ?, ?, ?);`,
        [file_id, content_type, data['user_id'], data['to_id']], (err: any, _: any) => {
          if (err) return socketEmit(socket, "error", 400);

          notify(data['to_id']);
        });
    });
  });
}

export default function messeage() {
  markAsReaden();
  setEvent('messeage', Messeage);
}