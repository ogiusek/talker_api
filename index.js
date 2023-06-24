const https = require('https');
const fs = require('fs');
const io = require('socket.io');
const express = require('express');

const defineApp = require('./app/defineApp');
const { db, defineSocket } = require('./app');

const options = {
  // openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

const app = express();
const server = https.createServer(options, app);
const socketServer = io(server);

setInterval(() => db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log('Clients: ' + rows.length)), 3000);

defineApp(app);
socketServer.on('connection', defineSocket);

const PORT = 8080;
server.listen(PORT, () => console.log(`App is running on ${PORT} port`));