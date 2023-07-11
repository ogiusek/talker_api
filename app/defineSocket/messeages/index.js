import db from '../../db/db.js';
import { getFileId } from '../../db/db.commands.js';
import auth_user from '../../utils/utilsCodes/auth_user.js';
import notify from './notify/index.js';
import { setEvent } from '../utils/index.js';

import * as _1 from "./read/index.js";

const messeage = (socket, data) => {
  const content_type = !('content_type' in data) ? 'text' : data['content_type'];
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data) || !('content' in data))
    return socketEmit(socket, "error", 400);

  auth_user(socket, data, () => {
    getFileId(data['content'], file_id => {
      db.run(`INSERT INTO messeages(content_id, content_type, from_user, to_user) VALUES(?, ?, ?, ?);`,
        [file_id, content_type, data['user_id'], data['to_id']], (err, _) => {
          if (err) return socketEmit(socket, "error", 400);

          notify(data['to_id']);
        });
    });
  });
}

setEvent('messeage', messeage);