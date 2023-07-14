"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTemporaryData = exports.getFileId = exports.getFile = exports.setClientAddress = exports.resetClientAddress = void 0;
const reset_1 = __importDefault(require("./func/clientAddress/reset"));
exports.resetClientAddress = reset_1.default;
const set_1 = __importDefault(require("./func/clientAddress/set"));
exports.setClientAddress = set_1.default;
const index_1 = require("./func/files/index");
Object.defineProperty(exports, "getFile", { enumerable: true, get: function () { return index_1.getFile; } });
Object.defineProperty(exports, "getFileId", { enumerable: true, get: function () { return index_1.getFileId; } });
const index_2 = __importDefault(require("./func/temporary/index"));
exports.removeTemporaryData = index_2.default;
//# sourceMappingURL=db.commands.js.map