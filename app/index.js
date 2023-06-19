const db = require('./db/db');
const dbCommands = require('./db/db.commands');

const defineSocket = require('./defineSocket');
const { emailTransporter, default_avatar, email, emailPass, frontend_link }
  = require('./utils');

module.exports = {
  db: db,
  dbCommands: dbCommands,
  defineSocket: defineSocket,

  emailTransporter: emailTransporter,
  default_avatar: default_avatar,
  email: email,
  emailPass: emailPass,
  frontend_link: frontend_link
};