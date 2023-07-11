import { WebSocketServer } from 'ws';
import http from "http";
import { Server as io } from "socket.io";
import express from 'express';
const PORT = 8080;

import { defineApp, defineSocket } from "./app/index.js";

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({ server: httpServer });
const socketServer = new io(httpServer);

// setInterval(() => db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log('Clients: ' + rows.length)), 3000);

defineApp(app);
// wsServer.on('connection', defineSocket);
wsServer.on('connection', defineSocket);
socketServer.on('connection', defineSocket);

httpServer.listen(PORT, () => console.log(`App is running on ${PORT} port`));