import { WebSocketServer } from 'ws';
import * as http from "http";
import { Server as io } from "socket.io";
import express from 'express';
import cors from "cors";

import { defineSocket } from "./app";
import defineApp from './app/defineApp';

const PORT = 8080;
const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({ server: httpServer });
const socketServer = new io(httpServer);

// setInterval(() => db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log('Clients: ' + rows.length)), 3000);

defineApp(app);
wsServer.on('connection', defineSocket);
socketServer.on('connection', defineSocket);

httpServer.listen(PORT, () => console.log(`App is running on ${PORT} port`));