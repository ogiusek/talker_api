import { createTransport } from "nodemailer";
import email from "./email";
import emailPass from "./email.pass";

const emailTransporter = createTransport({
  host: 'smtp.wp.pl',
  port: 465, secure: true,
  auth: { user: email, pass: emailPass }
});

export default emailTransporter;