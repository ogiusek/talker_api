import email from "./email.js";
import username from "./username.js";

function isUsed(app) {
  email(app);
  username(app);
}

export default isUsed;