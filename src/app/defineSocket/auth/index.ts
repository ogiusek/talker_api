import login from "./login";
import logout from "./logout";

import removeUnregisteredAccounts from "../../db/func/remove/removeUnregistered";

setInterval(() => {
  removeUnregisteredAccounts();
}, 1000 * 60 * 60 * 24);

function auth() {
  login();
  logout();
}

export { auth };