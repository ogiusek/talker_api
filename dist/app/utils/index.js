"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.for_address = exports.auth_user = exports.emailTransporter = exports.default_avatar = exports.email = exports.emailPass = exports.frontend_link = void 0;
const frontend_1 = __importDefault(require("./utilsData/frontend"));
exports.frontend_link = frontend_1.default;
const email_pass_1 = __importDefault(require("./utilsData/email.pass"));
exports.emailPass = email_pass_1.default;
const email_1 = __importDefault(require("./utilsData/email"));
exports.email = email_1.default;
const defaultAvatar_1 = __importDefault(require("./utilsData/defaultAvatar"));
exports.default_avatar = defaultAvatar_1.default;
const email_transporter_1 = __importDefault(require("./utilsData/email.transporter"));
exports.emailTransporter = email_transporter_1.default;
const auth_user_1 = __importDefault(require("./utilsCodes/auth_user"));
exports.auth_user = auth_user_1.default;
const for_address_1 = __importDefault(require("./utilsCodes/for_address"));
exports.for_address = for_address_1.default;
//# sourceMappingURL=index.js.map