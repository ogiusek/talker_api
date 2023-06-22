const { db } = require('../../db');

function messeage(socket) {
  socket.on('messeage', data => {
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
      return socket.emit('error', 400);
  });
}

module.exports = messeage;