"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("./block"));
const unlock_1 = __importDefault(require("./unlock"));
function block_user() {
    (0, block_1.default)();
    (0, unlock_1.default)();
}
exports.default = block_user;
//# sourceMappingURL=index.js.map