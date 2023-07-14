"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketEmit = exports.getEvents = exports.setEvent = exports.getEvent = exports.clients = void 0;
const clients_1 = __importDefault(require("./clients"));
exports.clients = clients_1.default;
var events_1 = require("./events");
Object.defineProperty(exports, "getEvent", { enumerable: true, get: function () { return events_1.getEvent; } });
Object.defineProperty(exports, "setEvent", { enumerable: true, get: function () { return events_1.setEvent; } });
Object.defineProperty(exports, "getEvents", { enumerable: true, get: function () { return events_1.getEvents; } });
var index_1 = require("./socket/index");
Object.defineProperty(exports, "socketEmit", { enumerable: true, get: function () { return index_1.socketEmit; } });
//# sourceMappingURL=index.js.map