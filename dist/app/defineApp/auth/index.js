"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const confirm_register_1 = __importDefault(require("./confirm.register"));
const index_1 = __importDefault(require("./isUsed/index"));
const register_1 = __importDefault(require("./register"));
function auth(app) {
    (0, confirm_register_1.default)(app);
    (0, register_1.default)(app);
    (0, index_1.default)(app);
}
exports.default = auth;
//# sourceMappingURL=index.js.map