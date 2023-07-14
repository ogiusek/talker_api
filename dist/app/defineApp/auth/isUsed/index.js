"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = __importDefault(require("./email"));
const username_1 = __importDefault(require("./username"));
function isUsed(app) {
    (0, email_1.default)(app);
    (0, username_1.default)(app);
}
exports.default = isUsed;
//# sourceMappingURL=index.js.map