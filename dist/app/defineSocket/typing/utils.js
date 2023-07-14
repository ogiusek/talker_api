"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typing = exports.runTimer = void 0;
let typing = {};
exports.typing = typing;
const typingTimeout = 1500;
const runTimer = (identyfier) => {
    clearTimeout(typing[identyfier].timer);
    typing[identyfier].timer = setTimeout(() => {
        typing[identyfier]['func']();
    }, typingTimeout);
};
exports.runTimer = runTimer;
//# sourceMappingURL=utils.js.map