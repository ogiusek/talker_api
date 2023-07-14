const socketEmit = (socket: any, eventname: any, data: any) => {
  if (socket.handshake) {
    socket.emit(eventname, data);
  } else {
    socket.send(JSON.stringify({ "event": eventname, data: data }));
  }
}

export default socketEmit;