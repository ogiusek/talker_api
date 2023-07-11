import nodemailer from "nodemailer";
import email from "./email.js";
import emailPass from "./email.pass.js";

const emailTransporter = nodemailer.createTransport({
  host: 'smtp.wp.pl',
  port: 465, secure: true,
  auth: { user: email, pass: emailPass }
});

export default emailTransporter;