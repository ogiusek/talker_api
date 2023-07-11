import { dbCommands } from '../../db/index.js';
import { setEvent } from '../utils/index.js';

const logout = (socket, data) => {
  const clientAddress = socket.handshake ? socket.handshake.url : socket.url;
  dbCommands.resetClientAddress(clientAddress);
}

setEvent('logout', logout);