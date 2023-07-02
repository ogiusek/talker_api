const confirm_register = require("./confirm.register");
const isUsed = require("./isUsed");
const register = require("./register");

function auth(app) {
  confirm_register(app);
  register(app);
  isUsed(app);
}

module.exports = auth;