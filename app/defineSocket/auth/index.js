import * as login from "./login.js";
import * as logout from "./logout.js";

import removeUnregisteredAccounts from "../../db/func/remove/removeUnregistered.js";

setInterval(() => {
  removeUnregisteredAccounts();
}, 1000 * 60 * 60 * 24);

// function auth(socket) {
//   login(socket);
//   logout(socket);
// }

// export { auth };