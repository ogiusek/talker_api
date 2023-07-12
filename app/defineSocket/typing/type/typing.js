import db from '../../../db/db.js';
import { runTimer, typing as typing_ } from '../utils.js';
import on_stop_typing from './on_stop_typing.js';
import notify from '../notify/index.js';
import { auth_user } from '../../../utils/index.js';
import { setEvent, socketEmit } from '../../utils/index.js';

const type = (socket, data) => {
  if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
    return socketEmit(socket, 'error', 400);

  auth_user(socket, data, () => {
    const identyfier = data['user_id'] + '-' + data['to_id'];

    if (typing_[identyfier] === undefined) {
      typing_[identyfier] = { 'func': on_stop_typing(data, identyfier) };

      db.run(`INSERT INTO typing(user, to_user) VALUES(?, ?);`,
        [data['user_id'], data['to_id']], () => {
          notify(data['user_id'], data['to_id']);
        });
    }

    runTimer(identyfier);
  });
}

export default function typing() {
  setEvent('type', type);
}