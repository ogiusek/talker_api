import email from "./email";
import username from "./username";

function isUsed(app: any) {
  email(app);
  username(app);
}

export default isUsed;