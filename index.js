const http = require('http');
const io = require('socket.io');
const express = require('express');

const defineApp = require('./app/defineApp');
const { db, defineSocket } = require('./app');

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

// setInterval(() => db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log('Clients: ' + rows.length)), 3000);

defineApp(app);
socketServer.on('connection', defineSocket);

const PORT = 8080;
server.listen(PORT, () => console.log(`App is running on ${PORT} port`));