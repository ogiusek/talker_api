const http = require('http');
const io = require('socket.io');

const db = require('./db/db');

const server = http.createServer();
const socketServer = io(server);

let clients = {};

socketServer.on('connection', (socket) => {
    const clientAddress = socket.handshake.address;
    clients[clientAddress] = socket;

    socket.on('messeage', data => {
        console.log("recived:", data);
    });

    socket.emit('messeage', 'hello world!');

    socket.on('disconnect', () => {
        clients[clientAddress] = undefined;
    });
});
const init = () => { };

server.listen(8080, init);