const confirm_register = require("./confirm.register");

function auth(app) {
  confirm_register(app);

}

module.exports = auth;