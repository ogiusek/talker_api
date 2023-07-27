import auth from './auth/index';
import blocked_user from './block_user/index';
import contacts from './contacts/index';
import messeage from './messeages/index';
import search from "./search/index";

function defineApp(app: any) {
  auth(app);
  blocked_user(app);
  messeage(app);
  contacts(app);
  search(app);
};

export default defineApp;