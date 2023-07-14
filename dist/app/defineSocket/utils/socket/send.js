"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketEmit = (socket, eventname, data) => {
    if (socket.handshake) {
        socket.emit(eventname, data);
    }
    else {
        socket.send(JSON.stringify({ "event": eventname, data: data }));
    }
};
exports.default = socketEmit;
//# sourceMappingURL=send.js.map