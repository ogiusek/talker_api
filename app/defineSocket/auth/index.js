import login from "./login.js";
import logout from "./logout.js";

import removeUnregisteredAccounts from "../../db/func/remove/removeUnregistered.js";

setInterval(() => {
  removeUnregisteredAccounts();
}, 1000 * 60 * 60 * 24);

function auth() {
  login();
  logout();
}

export { auth };