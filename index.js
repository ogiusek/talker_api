const PORT = 8080;
const WebSocket = require('ws');

const http = require('http');
const io = require('socket.io');
const express = require('express');

const defineApp = require('./app/defineApp');
const { defineSocket } = require('./app');

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocket.Server({ server: httpServer });
const socketServer = io(httpServer);

// setInterval(() => db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log('Clients: ' + rows.length)), 3000);

defineApp(app);
wsServer.on('connection', defineSocket);
socketServer.on('connection', defineSocket);

httpServer.listen(PORT, () => console.log(`App is running on ${PORT} port`));