const socket = require('socket.io-client')('http://localhost:8080', { secure: true, rejectUnauthorized: false });

socket.on('connect', () => {
  socket.on('messeage', data => {
    console.log(`recived: ${data}`);
  });

  socket.emit('messeage', 'Hello from the client!');
});