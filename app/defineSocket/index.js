const auth = require('./auth');
const block_users = require('./block_user');

const { dbCommands } = require('../db');
const messeage = require('./messeages');
const type = require('./typing');

let clients = require('./clients');

function defineSocketMethods(socket) {
  auth(socket);
  block_users(socket);
  messeage(socket);
  type(socket);
}

function defineSocket(socket) {
  const clientAddress = socket.handshake ? socket.handshake.url : socket.url;
  if (clients[clientAddress] === undefined)
    clients[clientAddress] = {};
  clients[clientAddress].socket = socket;

  defineSocketMethods(socket);

  socket.on('disconnect', () => {
    dbCommands.removeTemporaryData(clientAddress);
    dbCommands.resetClientAddress(clientAddress);
    delete clients[clientAddress];
  });
}

module.exports = { defineSocket: defineSocket, clients: clients };