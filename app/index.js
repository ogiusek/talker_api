const { db, dbCommands } = require('./db');

const defineApp = require('./defineApp');
const { defineSocket, clients } = require('./defineSocket');
const { emailTransporter, default_avatar, email, emailPass, frontend_link }
  = require('./utils');

module.exports = {
  db: db,
  dbCommands: dbCommands,

  defineSocket: defineSocket,
  clients: clients,

  defineApp: defineApp,

  emailTransporter: emailTransporter,
  default_avatar: default_avatar,
  email: email,
  emailPass: emailPass,
  frontend_link: frontend_link
};