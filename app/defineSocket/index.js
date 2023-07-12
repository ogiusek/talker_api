import { dbCommands } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';
import clients from './utils/clients.js';
import { getEvent, getEvents, socketEmit } from './utils/index.js';
import { auth } from './auth/index.js';
import block_user from './block_user/index.js';
import messeage from './messeages/index.js';
import typing from './typing/index.js';

function defineSocketMethods() {
  auth();
  block_user();
  messeage();
  typing();
}

defineSocketMethods();


const onInit = (socket) => {
  if (socket.handshake) {
    if (Object.keys(socket.handshake.auth).length)
      getEvent('login')(socket, socket.handshake.auth);
  } else {
    if (socket.data && socket.data.auth)
      getEvent('login')(socket, socket.data.auth);
  }
}

function defineSocket(socket, request) {
  if (!socket.handshake) socket.uniqueAddress = `ws://${request.socket.remoteAddress}/${new Date().getTime()}/${uuidv4()}`;
  else socket.uniqueAddress = socket.handshake.url;
  const clientAddress = socket.uniqueAddress;

  if (clients[clientAddress] === undefined)
    clients[clientAddress] = {};
  clients[clientAddress].socket = socket;
  socketEmit(socket, 'address', { address: clientAddress });
  onInit(socket);

  if (socket.handshake) {
    Object.entries(getEvents()).map(event => {
      socket.on(event[0], data => event[1](socket, data));
    });
  } else {
    socket.on('message', jsonData => {
      try {
        const rawData = JSON.parse(jsonData);
        const event = rawData.event;
        const data = rawData.data;
        getEvent(event)(socket, data);
      } catch (e) {
        socketEmit(socket, 'error', 400);
      }
    });
  }

  socket.on('disconnect', () => {
    dbCommands.removeTemporaryData(clientAddress);
    dbCommands.resetClientAddress(clientAddress);
    delete clients[clientAddress];
  });
}

export { defineSocket, clients };