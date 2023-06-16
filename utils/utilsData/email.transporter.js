const nodemailer = require('nodemailer');
const email = require('./email');
const emailPass = require('./email.pass');

const emailTransporter = nodemailer.createTransport({
  host: 'smtp.wp.pl',
  port: 465, secure: true,
  auth: { user: email, pass: emailPass }
});

module.exports = emailTransporter;