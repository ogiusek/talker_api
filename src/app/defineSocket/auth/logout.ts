import { dbCommands } from '../../db/index.js';
import { setEvent } from '../utils/index.js';

const Logout = (socket: any, data: any) => {
  const clientAddress = socket.uniqueAddress;
  dbCommands.resetClientAddress(clientAddress);
}

export default function logout() {
  setEvent('logout', Logout);
}