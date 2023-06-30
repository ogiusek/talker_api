const auth = require('./auth');
const blocked_user = require('./block_user');
const contacts = require('./contacts');
const messeage = require('./messeages');

function defineApp(app) {
  auth(app);
  blocked_user(app);
  messeage(app);
  contacts(app);

};

module.exports = defineApp;