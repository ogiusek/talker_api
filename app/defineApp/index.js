const blocked_user = require('./block_user');

function defineApp(app) {
  blocked_user(app);

};

module.exports = defineApp;