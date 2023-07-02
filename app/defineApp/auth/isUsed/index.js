const email = require("./email");
const username = require("./username");

function isUsed(app) {
  email(app);
  username(app);
}

module.exports = isUsed;