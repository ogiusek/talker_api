import { dbCommands } from '../db/index.js';

import clients from './utils/clients.js';
import { getEvent, getEvents, socketEmit } from './utils/index.js';
import * as _1 from "./auth/index.js";
import * as _2 from "./block_user/index.js";
import * as _3 from "./messeages/index.js";
import * as _4 from "./typing/index.js";

const onInit = (socket) => {
  if (socket.handshake) {
    if (Object.keys(socket.handshake.auth).length)
      getEvent('login')(socket, socket.handshake.auth);
  } else {
    if (socket.data && socket.data.auth)
      getEvent('login')(socket, socket.data.auth);
  }
}

function defineSocket(socket) {
  const clientAddress = socket.handshake ? socket.handshake.url : // socket.io socket
    socket.url; // ws socket

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