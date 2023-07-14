import confirm_register from "./confirm.register";
import isUsed from "./isUsed/index";
import register from "./register";

function auth(app: any) {
  confirm_register(app);
  register(app);
  isUsed(app);
}

export default auth;