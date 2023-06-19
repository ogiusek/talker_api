const auth = require('./auth');
const block_users = require('./block_user');
const { dbCommands } = require('../db');

let clients = {};

function defineSocketMethods(socket) {
  auth(socket);
  block_users(socket);
  // type messeage
}

function defineSocket(socket) {
  const clientAddress = socket.handshake.address;
  if (clients[clientAddress] === undefined)
    clients[clientAddress] = {};
  clients[clientAddress].clientAddress = clientAddress;

  defineSocketMethods(socket);

  socket.on('disconnect', () => {
    dbCommands.resetClientAddress(clientAddress);
    clients[clientAddress] = undefined;
  });
}

module.exports = { defineSocket: defineSocket, clients: clients };