"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineApp = exports.frontend_link = exports.emailPass = exports.email = exports.default_avatar = exports.emailTransporter = exports.clients = exports.defineSocket = exports.dbCommands = exports.db = void 0;
const index_1 = __importDefault(require("./defineApp/index"));
exports.defineApp = index_1.default;
var index_2 = require("./db/index");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return index_2.db; } });
Object.defineProperty(exports, "dbCommands", { enumerable: true, get: function () { return index_2.dbCommands; } });
var index_3 = require("./defineSocket/index");
Object.defineProperty(exports, "defineSocket", { enumerable: true, get: function () { return index_3.defineSocket; } });
Object.defineProperty(exports, "clients", { enumerable: true, get: function () { return index_3.clients; } });
var index_4 = require("./utils/index");
Object.defineProperty(exports, "emailTransporter", { enumerable: true, get: function () { return index_4.emailTransporter; } });
Object.defineProperty(exports, "default_avatar", { enumerable: true, get: function () { return index_4.default_avatar; } });
Object.defineProperty(exports, "email", { enumerable: true, get: function () { return index_4.email; } });
Object.defineProperty(exports, "emailPass", { enumerable: true, get: function () { return index_4.emailPass; } });
Object.defineProperty(exports, "frontend_link", { enumerable: true, get: function () { return index_4.frontend_link; } });
//# sourceMappingURL=index.js.map