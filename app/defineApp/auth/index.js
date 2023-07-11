import confirm_register from "./confirm.register.js";
import isUsed from "./isUsed/index.js";
import register from "./register.js";

function auth(app) {
  confirm_register(app);
  register(app);
  isUsed(app);
}

export default auth;