"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const email_1 = __importDefault(require("./email"));
const email_pass_1 = __importDefault(require("./email.pass"));
const emailTransporter = (0, nodemailer_1.createTransport)({
    host: 'smtp.wp.pl',
    port: 465, secure: true,
    auth: { user: email_1.default, pass: email_pass_1.default }
});
exports.default = emailTransporter;
//# sourceMappingURL=email.transporter.js.map