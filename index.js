const { db, dbCommands, defineSocket } = require('./app');

const http = require('http');
const io = require('socket.io');
const express = require('express');

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

setInterval(() => {
  db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log(rows));
}, 1000);

socketServer.on('connection', defineSocket);

const PORT = 8080;
server.listen(PORT, () => console.log(`App is running on ${PORT} port`));