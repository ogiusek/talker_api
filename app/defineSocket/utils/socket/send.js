const socketEmit = (socket, eventname, data) => {
  if (socket.handshake) {
    socket.emit(eventname, data);
  } else {
    socket.send(JSON.stringify({ "event": eventname, data: data }));
  }
}

export default socketEmit;