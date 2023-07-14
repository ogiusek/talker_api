"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const removeUnregistered_1 = __importDefault(require("../../db/func/remove/removeUnregistered"));
setInterval(() => {
    (0, removeUnregistered_1.default)();
}, 1000 * 60 * 60 * 24);
function auth() {
    (0, login_1.default)();
    (0, logout_1.default)();
}
exports.auth = auth;
//# sourceMappingURL=index.js.map