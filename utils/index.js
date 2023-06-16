const frontend_link = require('./utilsData/frontend');
const emailPass = require('./utilsData/email.pass');
const email = require('./utilsData/email');
const default_avatar = require('./utilsData/defaultAvatar');
const emailTransporter = require('./utilsData/email.transporter');

module.exports = {
  emailTransporter: emailTransporter,
  default_avatar: default_avatar,
  email: email,
  emailPass: emailPass,
  frontend_link: frontend_link
};