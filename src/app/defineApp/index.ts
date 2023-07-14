import auth from './auth/index';
import blocked_user from './block_user/index';
import contacts from './contacts/index';
import messeage from './messeages/index';

function defineApp(app: any) {
  auth(app);
  blocked_user(app);
  messeage(app);
  contacts(app);
};

export default defineApp;