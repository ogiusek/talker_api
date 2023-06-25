const blocked_user = require('./block_user');
const messeage = require('./messeages');

function defineApp(app) {
  blocked_user(app);
  messeage(app);

};

module.exports = defineApp;