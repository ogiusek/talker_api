"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../db/index.js");
const index_js_2 = require("../utils/index.js");
const Logout = (socket, data) => {
    const clientAddress = socket.uniqueAddress;
    index_js_1.dbCommands.resetClientAddress(clientAddress);
};
function logout() {
    (0, index_js_2.setEvent)('logout', Logout);
}
exports.default = logout;
//# sourceMappingURL=logout.js.map