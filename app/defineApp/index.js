const blocked_user = require('./block_user');
const contacts = require('./contacts');
const messeage = require('./messeages');


function defineApp(app) {
  blocked_user(app);
  messeage(app);
  contacts(app);

};

module.exports = defineApp;