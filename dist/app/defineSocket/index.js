"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = exports.defineSocket = void 0;
const index_1 = require("../db/index");
const uuid_1 = require("uuid");
const clients_1 = __importDefault(require("./utils/clients"));
exports.clients = clients_1.default;
const index_2 = require("./utils/index");
const index_3 = require("./auth/index");
const index_4 = __importDefault(require("./block_user/index"));
const index_5 = __importDefault(require("./messeages/index"));
const index_6 = __importDefault(require("./typing/index"));
function defineSocketMethods() {
    (0, index_3.auth)();
    (0, index_4.default)();
    (0, index_5.default)();
    (0, index_6.default)();
}
defineSocketMethods();
const onInit = (socket) => {
    if (socket.handshake) {
        if (Object.keys(socket.handshake.auth).length)
            (0, index_2.getEvent)('login')(socket, socket.handshake.auth);
    }
    else {
        if (socket.data && socket.data.auth)
            (0, index_2.getEvent)('login')(socket, socket.data.auth);
    }
};
function defineSocket(socket, request) {
    if (!socket.handshake)
        socket.uniqueAddress = `ws://${request.socket.remoteAddress}/${new Date().getTime()}/${(0, uuid_1.v4)()}`;
    else
        socket.uniqueAddress = socket.handshake.url;
    const clientAddress = socket.uniqueAddress;
    if (clients_1.default[clientAddress] === undefined)
        clients_1.default[clientAddress] = {};
    clients_1.default[clientAddress].socket = socket;
    (0, index_2.socketEmit)(socket, 'address', { address: clientAddress });
    onInit(socket);
    if (socket.handshake) {
        Object.entries((0, index_2.getEvents)()).map((event) => {
            socket.on(event[0], (data) => event[1](socket, data));
        });
    }
    else {
        socket.on('message', (jsonData) => {
            try {
                const rawData = JSON.parse(jsonData);
                const event = rawData.event;
                const data = rawData.data;
                (0, index_2.getEvent)(event)(socket, data);
            }
            catch (e) {
                (0, index_2.socketEmit)(socket, 'error', 400);
            }
        });
    }
    socket.on('disconnect', () => {
        index_1.dbCommands.removeTemporaryData(clientAddress);
        index_1.dbCommands.resetClientAddress(clientAddress);
        delete clients_1.default[clientAddress];
    });
}
exports.defineSocket = defineSocket;
//# sourceMappingURL=index.js.map