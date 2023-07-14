import db from '../../../db/db';
import { runTimer, typing as typing_ } from '../utils';
import on_stop_typing from './on_stop_typing';
import notify from '../notify/index';
import { auth_user } from '../../../utils/index';
import { setEvent, socketEmit } from '../../utils/index';

const type = (socket: any, data: any) => {
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