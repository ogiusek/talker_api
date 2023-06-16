const dbCommands = require('./db/db.commands.js');
const db = require('./db/db');
const defineSocket = require('./defineSocket');

const http = require('http');
const io = require('socket.io');

const server = http.createServer();
const socketServer = io(server);

let clients = {};

setInterval(() => {
    db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log(rows));
}, 1000);

socketServer.on('connection', (socket) => {
    const clientAddress = socket.handshake.address;
    if (clients[clientAddress] === undefined)
        clients[clientAddress] = {};
    clients[clientAddress].clientAddress = clientAddress;

    defineSocket(socket);

    // mail talker.mail.info@gmail.com
    // socket.on('login', data => {
    // socket.on('register', data => {

    // socket.on('logout', data => {
    //     dbCommands.resetClientAddress(clientAddress);
    // });

    // socket.on('type', data => {
    // });

    // socket.on('messeage', data => {
    // });

    // socket.emit('messeage', 'hello world!');

    socket.on('disconnect', () => {
        dbCommands.resetClientAddress(clientAddress);
        clients[clientAddress] = undefined;
    });
});

server.listen(8080, () => { });