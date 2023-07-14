"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const index_js_1 = require("./app/index.js");
const index_js_2 = __importDefault(require("./app/defineApp/index.js"));
const PORT = 8080;
const app = (0, express_1.default)();
const httpServer = http.createServer(app);
const wsServer = new ws_1.WebSocketServer({ server: httpServer });
const socketServer = new socket_io_1.Server(httpServer);
// setInterval(() => db.all(`SELECT * FROM users_addresses;`, (err, rows) => console.log('Clients: ' + rows.length)), 3000);
(0, index_js_2.default)(app);
// wsServer.on('connection', defineSocket);
wsServer.on('connection', index_js_1.defineSocket);
socketServer.on('connection', index_js_1.defineSocket);
httpServer.listen(PORT, () => console.log(`App is running on ${PORT} port`));
//# sourceMappingURL=index.js.map